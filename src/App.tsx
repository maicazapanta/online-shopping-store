import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Divider,
  Badge,
  Box,
  IconButton,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import "./App.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CartDialog from "./components/CartDialog";
import SearchBar from "./components/SearchBar";
import data from "./utils/items.json";
import { CategoryOutlined } from "@mui/icons-material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import GarageIcon from "@mui/icons-material/Garage";
import LivingIcon from "@mui/icons-material/Living";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { Grid } from "@mui/material";
import Item from "./components/Item";
import CartItem from "./components/CartItem";

interface ItemData {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
  quantity?: number;
}

const categories = [
  {
    id: "1",
    name: "All Products",
    icon: <CategoryOutlined />,
  },
  {
    id: "2",
    name: "groceries",
    icon: <LocalGroceryStoreIcon />,
  },
  {
    id: "3",
    name: "cloths",
    icon: <CheckroomIcon />,
  },
  {
    id: "4",
    name: "automotive",
    icon: <GarageIcon />,
  },
  {
    id: "5",
    name: "gadgets",
    icon: <PhoneAndroidIcon />,
  },
  {
    id: "6",
    name: "furniture",
    icon: <LivingIcon />,
  },
  {
    id: "7",
    name: "toys",
    icon: <SmartToyIcon />,
  },
  {
    id: "8",
    name: "lifestyle",
    icon: <AccessibilityIcon />,
  },
];

function App() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jsonData, setJsonData] = useState<ItemData[]>([]);
  const [filteredData, setFilteredData] = useState<ItemData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [isHighToLow, setIsHighToLow] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ItemData[]>([]);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const handleCategoryFilter = (categoryName: string) => {
    setSelectedCategory(categoryName === "All Products" ? null : categoryName);
  };

  const handleSortToggle = () => {
    setIsHighToLow(!isHighToLow);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddToCart = (item: ItemData) => {
    const updatedItem = { ...item, quantity: 1 };
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      console.log("Item already in cart:", item);
    } else {
      const updatedCartItems = [...cartItems, updatedItem];
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };
  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const handleIncreaseQuantity = (itemId: string) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === itemId
        ? {
            ...cartItem,
            quantity: cartItem.quantity ? cartItem.quantity + 1 : 1,
          }
        : cartItem
    );
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (itemId: string) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === itemId && cartItem.quantity && cartItem.quantity > 0
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCartItems(updatedCartItems);
  };

  const totalItems = cartItems.reduce(
    (total, cartItem) => total + (cartItem.quantity || 0),
    0
  );
  const totalAmount = cartItems.reduce(
    (total, cartItem) => total + cartItem.unitPrice * (cartItem.quantity || 0),
    0
  );

  const handleCheckout = () => {
    // Clear cart items from state and localStorage
    setCartItems([]);
    localStorage.removeItem("cartItems");

    // Display the "Thank you" modal
    setShowThankYouModal(true);
  };

  useEffect(() => {
    // Simulate fetching data (use the actual imported data)
    setJsonData(data);
    setFilteredData(data); // Initialize filteredData with all data
  }, []);

  useEffect(() => {
    // Apply filters and sorting when either searchText, selectedCategory, or jsonData changes
    const filtered = jsonData.filter((item) => {
      const matchesSearchText = item.productName
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === null || item.category === selectedCategory;

      return matchesSearchText && matchesCategory;
    });

    const sorted = filtered.slice().sort((a, b) => {
      if (isHighToLow) {
        return b.unitPrice - a.unitPrice;
      } else {
        return a.unitPrice - b.unitPrice;
      }
    });

    setFilteredData(sorted);
  }, [jsonData, searchText, selectedCategory, isHighToLow]);

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    <div className="App">
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ align: "left" }}>
            Online Store
          </Typography>
          <Button color="inherit" onClick={handleOpenDialog}>
            <Badge badgeContent={totalItems} color="secondary">
              <AddShoppingCartIcon />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>
      <div>
        <h2>Product Listing</h2>
        <Box>
          <SearchBar onSearch={setSearchText} />
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            {categories.map((category) => (
              <Tooltip key={category.id} title={category.name} placement="top">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor:
                      selectedCategory === category.name
                        ? "primary.main"
                        : "white",
                    margin: "0 5px",
                  }}
                >
                  <IconButton
                    onClick={() => handleCategoryFilter(category.name)}
                    sx={{ padding: 0 }}
                  >
                    {category.icon}
                  </IconButton>
                </Box>
              </Tooltip>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography
              onClick={handleSortToggle}
              sx={{ cursor: "pointer", p: 2 }}
            >
              Sort {isHighToLow ? "Low to High" : "High to Low"}
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} padding={4}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                {/* Create a CartItem object from ItemData */}
                <Item item={item} handleAddToCart={handleAddToCart} />
              </Grid>
            ))
          ) : (
            <Typography sx={{ textAlign: "center" }}>No items found</Typography>
          )}
        </Grid>
      </div>{" "}
      <CartDialog open={openDialog} onClose={handleCloseDialog}>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              cartItem={cartItem}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
            />
          ))
        ) : (
          <Typography>Your cart is empty.</Typography>
        )}
        <Divider />
        <Box sx={{ mt: 2, p: 2 }}>
          <Typography>Total Items: {totalItems}</Typography>
          <Typography>Total Amount: ${totalAmount.toFixed(2)}</Typography>
        </Box>
        {cartItems.length > 0 ? (
          <Button variant="contained" sx={{ m: 2 }} onClick={handleCheckout}>
            Checkout
          </Button>
        ) : null}
        <Button onClick={handleClearCart} variant="outlined" sx={{ mx: 2 }}>
          Clear Cart
        </Button>
      </CartDialog>
      {showThankYouModal && (
        <Dialog
          open={showThankYouModal}
          onClose={() => setShowThankYouModal(false)}
        >
          <DialogTitle>Thank you for your purchase!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your order has been placed. You will receive an email confirmation
              shortly.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowThankYouModal(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default App;
