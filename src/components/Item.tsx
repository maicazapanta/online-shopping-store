import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";

interface ItemData {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
  quantity?: number;
}

interface ItemProps {
  item: ItemData;
  handleAddToCart: (item: ItemData) => void;
}

const Item: React.FC<ItemProps> = ({ item, handleAddToCart }) => {
  return (
    <Card sx={{ maxHeight: 550 }}>
      <CardMedia
        component="img"
        height="140"
        image={item.imageUrl}
        alt={item.productName}
        sx={{ objectFit: "contain", p: 2 }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {item.productName}
        </Typography>
        <Typography
          variant="subtitle1"
          color="red"
          textTransform={"capitalize"}
        >
          {item.category}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ maxHeight: 50, overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {item.description}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Price: {item.unitPrice}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleAddToCart(item)}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Item;
