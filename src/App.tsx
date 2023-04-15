import { useState } from 'react';
import { useQuery } from 'react-query';

// JSX Component
import Items from './Items/Items';
import Cart from './Cart/Cart';

// MUI Components
import Drawer from '@mui/material/Drawer';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';

// Styled Component from MUI
import { Wrapper, StyledButton } from './App.styles';

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

// FakeStore API - 2 awaits ( 1 to fetch the api, and another to convert to json)
const getProducts = async (): Promise<CartItemType[]> => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json().catch((err) => console.log(err));
  return data;
};

function App() {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemType[] | null>([]);
  // Initialise useQuery by passing in desciption and the apicall function
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  // console.log(data);

  // Get total amount of cart
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((a: number, b: CartItemType) => a + b.amount, 0);

  // Add a product to cart on click
  const handleAddToCart = (clickedItem: CartItemType) => null;

  // Remove a product from cart
  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong!</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems ?? []}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems!)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Items item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
