module.exports = {
  getAllSalesQuery: `
    SELECT SP.sale_id saleId, S.date, SP.product_id productId, SP.quantity
    FROM sales_products SP
    INNER JOIN sales S ON SP.sale_id = S.id`,
  findByIdSalesQuery: `
    SELECT S.date, SP.product_id productId, SP.quantity
    FROM sales_products SP
    INNER JOIN sales S ON SP.sale_id = S.id
    WHERE SP.sale_id = ?`,
};