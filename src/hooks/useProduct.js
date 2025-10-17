import { useState, useEffect } from "react";
import { productService } from "../services/productService";

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchAllData = async () => {
      console.log(`[useProduct] Iniciando fetch para productId: ${productId}`);
      try {
        setLoading(true);
        setError(null);
        setProduct(null);
        setBreadcrumbs([]);
        setRelatedProducts([]);

        // 1. Obtener el producto
        const productData = await productService.getProductById(productId);
        setProduct(productData);

        if (!productData) {
          throw new Error("Producto no encontrado en la API.");
        }

        // 2. Construir las migas de pan
        let breadcrumbPath = [];
        if (productData.categoryId) {
          const path = [];
          const visitedIds = new Set();
          let currentCategoryId = productData.categoryId;

          while (
            currentCategoryId &&
            currentCategoryId !== 0 &&
            !visitedIds.has(currentCategoryId)
          ) {
            visitedIds.add(currentCategoryId);
            const category =
              await productService.getCategoryById(currentCategoryId);
            path.unshift(category);
            currentCategoryId = category.parentId;
          }
          breadcrumbPath = path;
          setBreadcrumbs(breadcrumbPath);
        }

        // 3. Obtener productos relacionados
        console.log(
          "[useProduct] 3. Iniciando fetch de productos relacionados.",
        );
        const collectedProducts = [];
        const productIds = new Set([productData.id]);
        const categorySearchOrder = [...breadcrumbPath].reverse(); // De la más específica a la más general

        for (const category of categorySearchOrder) {
          if (collectedProducts.length >= 6) break;

          const products = await productService.getProducts({
            categoryId: category.id,
            page: 0,
            size: 7,
          });
          for (const p of products.products) {
            if (!productIds.has(p.id)) {
              productIds.add(p.id);
              collectedProducts.push(p);
              if (collectedProducts.length >= 6) break;
            }
          }
        }
        console.log(
          `[useProduct] Productos relacionados encontrados: ${collectedProducts.length}`,
          collectedProducts,
        );
        setRelatedProducts(collectedProducts);
      } catch (err) {
        console.error("[useProduct] Error capturado:", err);
        setError(err.message);
      } finally {
        console.log("[useProduct] Finalizando fetch.");
        setLoading(false);
      }
    };

    fetchAllData();
  }, [productId]);

  return { product, breadcrumbs, relatedProducts, loading, error };
};
