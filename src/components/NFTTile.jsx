// import axie from "../tile.jpeg";
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../pinata";

function NFTTile(data) {
    const newTo = {
        pathname: "/nftPage/" + data.data.tokenId
    }

    const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

    return (
        <Link to={newTo} >
            <div className="border-2 ml-12 mt-5 mb-12 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
                <img alt="abc" src={IPFSUrl} className="w-80 h-80 rounded-lg object-cover" />

                <div className="text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20">
                    <strong className="text-xl">{data.data.name}</strong>
                    <p className="display-inline">
                        {data.data.description.length > 72
                            ? `${data.data.description.trim().substring(0, 32)}...`
                            : data.data.description}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default NFTTile;
