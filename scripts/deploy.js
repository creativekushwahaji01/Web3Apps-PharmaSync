const { ethers } = require("ethers");
const { items } = require("../src/items.json");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether');
};

async function main() {
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mainnet-rpc.com');
    const [deployer] = await provider.listAccounts();

    // deploy
    const Medicine = await ethers.getContractFactory("Medicine");
    const medicine = await Medicine.connect(provider.getSigner(deployer)).deploy();
    await medicine.deployed();

    console.log(`Deployed Contract at: ${medicine.address}\n`);

    //list items
    for (let i = 0; i < items.length; i++) {
        const transaction = await medicine.connect(provider.getSigner(deployer)).list(
            items[i].id,
            items[i].name,
            items[i].category,
            items[i].image,
            tokens(items[i].price),
            items[i].rating,
            items[i].stock,
        );

        await transaction.wait();

        console.log(`Listed item ${items[i].id}: ${items[i].name}`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
