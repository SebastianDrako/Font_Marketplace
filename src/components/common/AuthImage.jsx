import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProductImage } from "../../redux/productSlice";
import { Spinner } from "react-bootstrap";

const AuthImage = ({ imageId, alt, ...props }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!imageId) {
      setLoading(false);
      setError(true);
      return;
    }

    let objectUrl = null;

    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(false);
        // Dispatch the thunk and unwrap the result (the blob)
        const blob = await dispatch(fetchProductImage(imageId)).unwrap();
        objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl);
      } catch (e) {
        console.error("Failed to fetch auth image", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();

    // Cleanup function to revoke URL and free memory
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [imageId, dispatch]);

  if (loading) {
    return (
      <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
    );
  }

  if (error || !imageUrl) {
    return (
      <img
        src="https://placehold.co/600x400/E9ECEF/495057?text=Error"
        alt="Error al cargar imagen"
        {...props}
      />
    );
  }

  return <img src={imageUrl} alt={alt} {...props} />;
};

export default AuthImage;
