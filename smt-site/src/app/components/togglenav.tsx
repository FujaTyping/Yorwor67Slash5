import { Button } from "@nextui-org/react";
import { FaListUl } from "react-icons/fa";

const Tognav = ({ isVisible ,toggleVisibility}) => {
    return(
    <Button isIconOnly onClick={toggleVisibility}>
        <FaListUl />
    </Button>
    )
}

export default Tognav;