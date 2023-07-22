
const challanExample = [
    {
        challan_id:1,
        date:"1/5/2023",
        item_name:"Item 1",
        code:"0001",
        lno:"01",
        pes:3,
        rate:50,
        amount:150,
        size:"16-32"
    },
    {
        challan_id:2,
        date:"1/5/2023",
        item_name:"Item 2",
        code:"0002",
        lno:"02",
        pes:2,
        rate:50,
        amount:100,
        size:"16-32"
    },
    {
        challan_id:3,
        date:"1/5/2023",
        item_name:"Item 3",
        code:"0001",
        lno:"03",
        pes:1,
        rate:50,
        amount:50,
        size:"16-32"
    }
];


const challan_format = async (response) => {

    let data = [
        ["Sky Age Garments","","","","","","","",""],
        ["Date","Challan","Lot","Item Name","Code","Size","pieces","Rate","Amount",]
    ];
    let total_amount = 0;

    await response.forEach(element => {
        total_amount += element.amount, 
        data.push([
            element.date,
            element.challan_id,
            element.lno,
            element.item_name,
            element.code,
            element.size,
            element.pes,
            element.rate,
            element.amount,
        ]);
    });

    data.push(["","","","","","","","Total",total_amount]);
    return data;
}

module.exports = {
    challan_format,
    challanExample
}