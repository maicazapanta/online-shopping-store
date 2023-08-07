import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CartItemProps {
  cartItem: {
    id: string;
    productName: string;
    unitPrice: number;
    imageUrl: string;
    quantity?: number;
  };
  handleIncreaseQuantity: (itemId: string) => void;
  handleDecreaseQuantity: (itemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  cartItem,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}) => {
  const { id, productName, unitPrice, imageUrl, quantity } = cartItem;

  return (
    <Box sx={{ display: "flex", alignItems: "center", my: 2, p: 2 }}>
      <img src={imageUrl} alt={productName} width="100" height="100" />
      <Box sx={{ ml: 2 }}>
        <Typography>{productName}</Typography>
        <Typography>${unitPrice}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <IconButton onClick={() => handleDecreaseQuantity(id)}>
            <RemoveIcon />
          </IconButton>
          <Typography>{quantity ? quantity : 0}</Typography>
          <IconButton onClick={() => handleIncreaseQuantity(id)}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default CartItem;
