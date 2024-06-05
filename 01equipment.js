class Equipment {
    #name;
    //netPrice;

    constructor( name) {
        this.#name = name;
        //this.netPrice = netPrice;
    }

    add(equipment){}

    remove(equipment){}

    get netPrice(){}
}


class LeafEquipment extends Equipment {
// leaf
netPrice;

    constructor( name, netPrice){
        super( name);
        this.netPrice = netPrice
    }

    get netPrice() {
        return this.netPrice;
    }
}

class compositeEquipment extends Equipment {
    #children = [];

    add(equipment){
        this.#children.push(equipment);
    }

    remove(equipment){
        const componentIndex = this.#children.indexOf(equipment);
        this.#children.splice(componentIndex, 1);
    }

    get netPrice(){
        let total = 0;
        for (let child of this.#children){
            total += child.netPrice;
        }
        return total;
    }
}

const chassis = new compositeEquipment("Chassis PRO");
chassis.add(new LeafEquipment("ssd drive", 80));
chassis.add(new LeafEquipment("ssd drive pro", 120));

const motherBoard = new compositeEquipment("MSI board");
const airCooler = new LeafEquipment("air cooler", 20);
motherBoard.add(airCooler);
motherBoard.add(new LeafEquipment("disipador", 30));
motherBoard.add(new LeafEquipment("chipset", 100));

chassis.add(motherBoard)

console.log(chassis.netPrice)

motherBoard.remove(airCooler)

console.log(chassis.netPrice)