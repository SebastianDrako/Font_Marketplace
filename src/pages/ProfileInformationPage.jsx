import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { changePassword, resetPasswordChangeStatus } from "../redux/authSlice";

const ProfileInformationPage = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { passwordChangeStatus, passwordChangeError } = useSelector(
    (state) => state.auth
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (passwordChangeStatus === "succeeded") {
      setSuccessMessage("¡Contraseña cambiada con éxito!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      dispatch(resetPasswordChangeStatus());
    }
  }, [passwordChangeStatus, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    setSuccessMessage("");
    dispatch(resetPasswordChangeStatus());

    if (newPassword !== confirmPassword) {
      setValidationError("Las contraseñas nuevas no coinciden.");
      return;
    }

    if (newPassword.length < 6) {
      setValidationError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    dispatch(changePassword({ oldPassword, newPassword }));
  };

  return (
    <Card>
      <Card.Header as="h2">Mi Información</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Nombre:</strong> {user?.name}
        </Card.Text>
        <Card.Text className="mb-4">
          <strong>Correo Electrónico:</strong> {user?.email}
        </Card.Text>

        <hr />

        <h4 className="mt-4">Cambiar Contraseña</h4>
        <Form onSubmit={handleSubmit}>
          {(validationError || passwordChangeError) && (
            <Alert variant="danger">
              {validationError ||
                (typeof passwordChangeError === 'string'
                  ? passwordChangeError
                  : "Error al cambiar la contraseña.")}
            </Alert>
          )}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Form.Group className="mb-3" controlId="oldPassword">
            <Form.Label>Contraseña Antigua</Form.Label>
            <Form.Control
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>Contraseña Nueva</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirmar Contraseña Nueva</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={passwordChangeStatus === "loading"}
          >
            {passwordChangeStatus === "loading" ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Cambiar Contraseña"
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProfileInformationPage;
