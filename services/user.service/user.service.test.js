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
              nombreCompleto: expect.any(String),
              correo: expect.any(String),
              encryptedPassword: expect.any(String),
            }),
          ])
        );
      });
  });

  it("GET /users/:id --> error porque id de usuario no existe cod 404", () => {
    return request(app).get("/users/999999").expect(404);
  });

  it("GET /users/:id --> usuario y cod 200", () => {
    return request(app)
      .get("/users/1")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            nombreCompleto: expect.any(String),
            correo: expect.any(String),
            encryptedPassword: expect.any(String),
          })
        );
      });
  });
});

describe("Registrar usuario", () => {
  it("POST /users/ --> error porque los campos no estan completos cod 400", () => {});

  it("POST /users/ --> error porque la contraseña tiene menos de 8 caracteres cod 400", () => {});

  it("POST /users/ --> error porque el email no es valido cod 400", () => {});

  it('POST /users/ --> error porque ya existe un usuario con el correo dado cod 409 "conflict"', () => {});

  it('POST /users/ --> id de usuario creado cod 201 "created"', () => {});
});
