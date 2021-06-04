import ItemList from './ItemList'
import { CSSProperties } from "@material-ui/styles";

const ProductPage = () => {
    return (
        <div>
            <h1 style={title}>Products</h1>
           <ItemList/> 
        </div>
    )
}

const title: CSSProperties = {
    textAlign: "center",
    margin: "0rem 1rem",
};

export default ProductPage