import request from 'supertest';
import express, { Express } from 'express';
import multerRoute from '../src/api/v1/routes/multerRoute';
import fs from 'fs';
import path from 'path';

let app: Express;

beforeAll(() => {
       app = express();
       app.use('/api', multerRoute);

       // Create uploads folder if it doesn't exist
       if (!fs.existsSync('./uploads')) {
              fs.mkdirSync('./uploads');
       }
});

afterAll(() => {
       // Cleanup: delete test files
       const uploadsDir = './uploads';
       if (fs.existsSync(uploadsDir)) {
              const files = fs.readdirSync(uploadsDir);
              files.forEach(file => {
                     fs.unlinkSync(path.join(uploadsDir, file));
              });
       }
});

describe('File Upload Tests', () => {

       it('should upload a file successfully', async () => {
              const response = await request(app)
                     .post('/api/uploads')
                     .attach('file', Buffer.from('test content'), 'test.txt');

              expect(response.status).toBe(200);
              expect(response.body.message).toBe('File uploaded successfully');
              expect(response.body.data.filename).toBe('test.txt');  // ← Change from file to data
       });

       it('should return 400 if no file is uploaded', async () => {
              const response = await request(app)
                     .post('/api/uploads');

              expect(response.status).toBe(400);
              expect(response.body.message).toBe('No file uploaded');
       });

       it('should save file to uploads folder', async () => {
              await request(app)
                     .post('/api/uploads')
                     .attach('file', Buffer.from('test data'), 'sample.txt');

              const files = fs.readdirSync('./uploads');
              expect(files).toContain('sample.txt');
       });

       it('should return file metadata', async () => {
              const response = await request(app)
                     .post('/api/uploads')
                     .attach('file', Buffer.from('test content'), 'metadata.txt');

              expect(response.body.data).toHaveProperty('filename');  // ← Change from file to data
              expect(response.body.data).toHaveProperty('path');
              expect(response.body.data).toHaveProperty('size');
       });
});