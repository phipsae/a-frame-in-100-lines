// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract TransactionTrackerNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("TransactionTrackerNFT", "TTN") Ownable(msg.sender) {}

    function mintNFT(uint256 txCount) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);

        string memory svgImage = generateSVGImage(txCount);
        string memory tokenURI = formatTokenURI(svgImage, txCount);

        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function generateSVGImage(uint256 txCount) internal pure returns (string memory) {
        if (txCount < 10) {
            return string(abi.encodePacked(
                "<svg width='1000' height='1000' viewBox='0 0 1000 1000' fill='none' xmlns='http://www.w3.org/2000/svg'>",
                "<rect width='1000' height='1000' fill='white'/>",
                "<path d='M572 500.126C572 460.292 539.764 428 500 428C460.235 428 428 460.292 428 500.126C428 537.918 457.015 568.921 493.948 572V476.667H506.052V572C542.984 568.921 572 537.918 572 500.126Z' fill='#0052FF'/>",
                "<path d='M131.944 164C149.648 164 164 149.673 164 132C164 114.327 149.648 100 131.944 100C115.148 100 101.368 112.896 100 129.31H142.37V134.69H100C101.368 151.104 115.148 164 131.944 164Z' fill='#0052FF'/>",
                "<path d='M867.001 881V873.768H879.161V842.024L866.937 850.984V842.024L877.689 834.28H887.161V873.768H896.953V881H867.001Z' fill='#0052FF'/>",
                "<text x='10' y='980' fill='black'>", uint2str(txCount), "</text>",
                "</svg>"
            ));
        } else if (txCount < 100) {
            return string(abi.encodePacked(
                "<svg width='1000' height='1000' viewBox='0 0 1000 1000' fill='none' xmlns='http://www.w3.org/2000/svg'>",
                "<rect width='1000' height='1000' fill='#0052FF'/>",
                "<path d='M672 500.3C672 405.142 594.993 328 500 328C405.007 328 328 405.142 328 500.3C328 590.581 397.315 664.644 485.542 672V444.259H514.458V672C602.685 664.644 672 590.581 672 500.3Z' fill='white'/>",
                "<path d='M131.944 164C149.648 164 164 149.673 164 132C164 114.327 149.648 100 131.944 100C115.148 100 101.368 112.896 100 129.31H142.37V134.69H100C101.368 151.104 115.148 164 131.944 164Z' fill='white'/>",
                "<path d='M828.626 881V873.768H840.786V842.024L828.562 850.984V842.024L839.314 834.28H848.786V873.768H858.578V881H828.626ZM880.825 881.64C877.796 881.64 875.172 881.064 872.953 879.912C870.734 878.76 869.006 877.139 867.769 875.048C866.574 872.957 865.977 870.504 865.977 867.688V847.592C865.977 844.776 866.574 842.323 867.769 840.232C869.006 838.141 870.734 836.52 872.953 835.368C875.172 834.216 877.796 833.64 880.825 833.64C883.854 833.64 886.478 834.216 888.697 835.368C890.916 836.52 892.622 838.141 893.817 840.232C895.054 842.323 895.673 844.776 895.673 847.592V867.688C895.673 870.504 895.054 872.957 893.817 875.048C892.622 877.139 890.916 878.76 888.697 879.912C886.478 881.064 883.854 881.64 880.825 881.64ZM880.825 874.728C883.044 874.728 884.814 874.088 886.137 872.808C887.46 871.528 888.121 869.821 888.121 867.688V847.592C888.121 845.459 887.46 843.752 886.137 842.472C884.857 841.192 883.086 840.552 880.825 840.552C878.564 840.552 876.772 841.192 875.449 842.472C874.169 843.752 873.529 845.459 873.529 847.592V867.688C873.529 869.821 874.19 871.528 875.513 872.808C876.836 874.088 878.606 874.728 880.825 874.728ZM880.825 861.48C879.545 861.48 878.521 861.139 877.753 860.456C876.985 859.731 876.601 858.728 876.601 857.448C876.601 856.168 876.985 855.208 877.753 854.568C878.521 853.885 879.545 853.544 880.825 853.544C882.105 853.544 883.129 853.885 883.897 854.568C884.665 855.208 885.049 856.168 885.049 857.448C885.049 858.728 884.665 859.731 883.897 860.456C883.129 861.139 882.105 861.48 880.825 861.48Z' fill='white'/>",
                "<text x='10' y='980' fill='black'>", uint2str(txCount), "</text>",
                "</svg>"
            ));
        } else if (txCount < 1000) {
            return string(abi.encodePacked(
                "<svg width='1000' height='1000' viewBox='0 0 1000 1000' fill='none' xmlns='http://www.w3.org/2000/svg'>",
                "<rect width='1000' height='1000' fill='black'/>",
                "<ellipse cx='499.836' cy='499.835' rx='372' ry='372' transform='rotate(90.5938 499.836 499.835)' fill='url(#paint0_linear_1_57)'/>",
                "<path d='M131.944 164C149.648 164 164 149.673 164 132C164 114.327 149.648 100 131.944 100C115.148 100 101.368 112.896 100 129.31H142.37V134.69H100C101.368 151.104 115.148 164 131.944 164Z' fill='#F7E582'/>",
                "<path d='M828.626 881V873.768H840.786V842.024L828.562 850.984V842.024L839.314 834.28H848.786V873.768H858.578V881H828.626ZM866.873 881V834.28H874.873V859.624H880.505L888.889 845.8H897.785L887.353 862.824L898.169 881H889.081L880.505 866.408H874.873V881H866.873Z' fill='#F7E582'/>",
                "<defs><linearGradient id='paint0_linear_1_57' x1='875.281' y1='495.473' x2='124.015' y2='503.26' gradientUnits='userSpaceOnUse'>",
                "<stop stop-color='#AD8B27'/>",
                "<stop offset='0.498476' stop-color='#F7E582'/>",
                "<stop offset='1' stop-color='#AD8B27'/>",
                "</linearGradient></defs>",
                "<text x='10' y='980' fill='white'>", uint2str(txCount), "</text>",
                "</svg>"
            ));
        } else {
            return string(abi.encodePacked(
                "<svg width='1000' height='1000' viewBox='0 0 1000 1000' fill='none' xmlns='http://www.w3.org/2000/svg'>",
                "<rect width='1000' height='1000' fill='black'/>",
                "<ellipse cx='499.836' cy='499.835' rx='372' ry='372' transform='rotate(90.5938 499.836 499.835)' fill='url(#paint0_linear_1_57)'/>",
                "<path d='M131.944 164C149.648 164 164 149.673 164 132C164 114.327 149.648 100 131.944 100C115.148 100 101.368 112.896 100 129.31H142.37V134.69H100C101.368 151.104 115.148 164 131.944 164Z' fill='#F7E582'/>",
                "<path d='M828.626 881V873.768H840.786V842.024L828.562 850.984V842.024L839.314 834.28H848.786V873.768H858.578V881H828.626ZM866.873 881V834.28H874.873V859.624H880.505L888.889 845.8H897.785L887.353 862.824L898.169 881H889.081L880.505 866.408H874.873V881H866.873Z' fill='#F7E582'/>",
                "<defs><linearGradient id='paint0_linear_1_57' x1='875.281' y1='495.473' x2='124.015' y2='503.26' gradientUnits='userSpaceOnUse'>",
                "<stop stop-color='#AD8B27'/>",
                "<stop offset='0.498476' stop-color='#F7E582'/>",
                "<stop offset='1' stop-color='#AD8B27'/>",
                "</linearGradient></defs>",
                "<text x='10' y='980' fill='white'>", uint2str(txCount), "</text>",
                "</svg>"
            ));
        }
    }

    function formatTokenURI(string memory svg, uint256 txCount) internal pure returns (string memory) {
        string memory json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "Transaction Tracker NFT",',
            '"description": "An NFT that tracks the number of transactions at the time of minting.",',
            '"attributes": [{"trait_type": "Transaction Count", "value": ', uint2str(txCount), '}],',
            '"image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'
        ))));
        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
