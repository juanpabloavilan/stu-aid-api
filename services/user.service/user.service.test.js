const request = require("supertest");
const app = require("../../app");

/**
 * Pruebas modulo usuario.
 * entiendase '-->' por 'debería retornar'
 */
describe("Obtener usuarios", () => {
  it("GET /users/ -->  arreglo de usuarios registrados cod 200", () => {
    return request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              fullname: expect.any(String),
              email: expect.any(String),
              password: expect.any(String),
            }),
          ])
        );
      });
  });

  it("GET /users/:id --> error porque id de usuario no existe cod 404", () => {
    return request(app).get("/users/9999").expect(404);
  });

  it("GET /users/:id --> usuario y cod 200", () => {
    return request(app)
      .get("/users/1")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            fullname: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
          })
        );
      });
  });
});

describe("Registrar usuario", () => {
  it("POST /users/ --> error porque los campos no estan completos cod 400", () => {
    const payload = {
      fullname:
        "Juan Pablo Avilan Moreno" /**Debe existir un password y un correo */,
    };
    return request(app)
      .post("/users")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/);
  });

  it("POST /users/ --> error porque la contraseña tiene menos de 8 caracteres cod 400", () => {
    const payload = {
      fullname: "Juan Pablo Avilan Moreno",
      email: "prueba1@gmail.com",
      password: "hola",
    };
    return request(app)
      .post("/users")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/);
  });

  it("POST /users/ --> error porque el email no es valido cod 400", () => {
    const payload = {
      fullname: "Juan Pablo Avilan Moreno",
      email: "prueba",
      password: "hola12345",
    };
    return request(app)
      .post("/users")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/);
  });

  it('POST /users/ --> error porque ya existe un usuario con el correo dado cod 409 "conflict"', () => {
    const payload = {
      fullname: "Juan Pablo Avilan Moreno",
      email: "avilanjuanpablo@gmail.com",
      password: "hola12345",
    };
    return request(app)
      .post("/users")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(409)
      .expect("Content-Type", /json/);
  });

  it('POST /users/ --> id de usuario creado cod 201 "created"', () => {
    const payload = {
      fullname: "Juan Camilo",
      email: "juank3@gmail.com",
      password: "hola12345",
    };
    return request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(payload)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            fullname: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
          })
        );
      });
  });
});
