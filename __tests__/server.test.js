const app = require('../server/server');
const request = require('supertest');

beforeAll(done => {
    done()
});

afterAll(done => {
    done();
});

describe('post-/api/signup', () => {
  
    test('should respond with a 201 status code', async () => {
      const response = await request(app).post('/api/signup').send({
        username: 'username',
        password: 'password',
      });
      expect(response.statusCode).toBe(201);
    });

    test('content type header should specify json', async () => {
      const response = await request(app).post('/api/signup').send({
        username: 'username',
        password: 'password',
      });
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });

    test('response has isLogged property', async () => {
      const response = await request(app).post('/api/signup').send({
        username: 'username',
        password: 'password',
      });
      expect(response.text).toEqual(expect.stringContaining('isLogged'));
    });
  

  
    test('username is an empty string', async () => {
      const response = await request(app).post('/api/signup').send({
        username: '',
        password: 'password',
      });
      expect(response.text).toEqual(expect.stringContaining('false'));
    });

    test('password is an empty string', async () => {
      const response = await request(app).post('/api/signup').send({
        username: 'username',
        password: '',
      });
      expect(response.text).toEqual(expect.stringContaining('false'));
    });

    test('username already exists', async () => {
      const response = await request(app).post('/api/signup').send({
        username: 'dinosaur',
        password: 'password',
      });
      expect(response.text).toEqual(expect.stringContaining('false'));
    });
  });


describe('GET /api/login', () => {
  
    test('response is in json format', async () => {
      const username = 'dinosaur';
      const password = '123';
      const response = await request(app).get(
        `/api/login?username=${username}&password=${password}`
      );
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });
    test('response has inLogged property', async () => {
      const username = 'dinosaur';
      const password = '123';
      const response = await request(app).get(
        `/api/login?username=${username}&password=${password}`
      );
      expect(response.text).toEqual(expect.stringContaining('isLogged'));
    });
  

  
    test('username and password are valid', async () => {
      //database contains username and password
      //responds with logged in = true state
      const username = 'dinosaur';
      const password = '123';
      const response = await request(app).get(
        `/api/login?username=${username}&password=${password}`
      );
      expect(response.text).toEqual(expect.stringContaining('true'));
    });

    test('password is empty', async () => {
      //database contains username and password
      //responds with logged in = true state
      const username = 'dinosaur';
      const password = '';
      const response = await request(app).get(
        `/api/login?username=${username}&password=${password}`
      );
      expect(response.text).toEqual(expect.stringContaining('false'));
    });
    test('username is empty', async () => {
      //database contains username and password
      //responds with logged in = true state
      const username = '';
      const password = '123';
      const response = await request(app).get(
        `/api/login?username=${username}&password=${password}`
      );
      expect(response.text).toEqual(expect.stringContaining('false'));
    });
  });


describe('POST /api/build', () => {
  
    test('responds with status code 201', async () => {
      const response = await request(app).post('/api/build').send({
        size: '75%',
        pcb: 'traditional',
        plate: 'aluminum',
        switch: 'clicky',
        keycap: 'pbt',
        name: 'test_build',
        username: 'dinosaur',
      });
      expect(response.statusCode).toBe(201);
    });

  });


describe('GET /api/saved', () => {

    test('should respond with a 200 status code', async () => {
        const response = await request(app)
        .get('/api/saved?username=dinosaur')

        expect(response.statusCode).toBe(200)
    })

    test('response should be in json format', async () => {
        const response = await request(app)
            .get('/api/saved?username=dinosaur')
    
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
              );
        })

    test('response should have a property builds', async () => {
    const response = await request(app)
        .get('/api/saved?username=dinosaur')

        expect(response.text).toEqual(expect.stringContaining('size', 'switch', 'user_id', 'name', 'pcb', 'keycap', 'plate', 'build_id'));
    })

})

// describe('delete builds', () => {
//     beforeEach(async done => {
//         const response = await request(app).post('/api/build').send({
//             size: '75%',
//             pcb: 'traditional',
//             plate: 'aluminum',
//             switch: 'clicky',
//             keycap: 'pbt',
//             name: 'test_build',
//             username: 'dinosaur',
//           });
//           //somehow save the build_id from response
//         done()
//     });
    

//     test('should respond with 200 status code', async() => {
//         const resposne = await request(app)
//         .delete('/api/build').send({
//             build_id: '',
//         })
//     })

//     test('should delete existing build', async() => {
        
//     })
// })