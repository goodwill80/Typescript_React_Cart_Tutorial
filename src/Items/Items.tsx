// Import  MUI components
import Button from '@mui/material/Button';
// Import Styles
import { Wrapper } from './Items.styles';
// Import Types
import { CartItemType } from '../App';

// Props type
type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

// Component
function Items({ item, handleAddToCart }: Props) {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
  );
}

export default Items;
