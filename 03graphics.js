class Graphic {
    #name;
    // x;
    //y;
    heigth;
    width;
    margingTopBotton;
    margingLeftRight;
    parent;

    constructor(name) {
        this.#name = name;
    }

    add(graphic) { }

    remove(graphic) { }

    get draw() { }

    get parent() {
        return this.parent;
    }

    set parent(parent) {
        this.parent = parent;
    }
}


class LeafGridItem extends Graphic {
    // leaf
    x;
    y;
    heigth;
    width;
    margingTopBotton;
    margingLeftRight;

    constructor(name, relativePosition) {
        super(name);
        //this.x = this.recalculateX();
        //this.y = this.recalculateY();
        this.heigth = relativePosition.heigth;
        this.width = relativePosition.width;
        this.margingTopBotton = relativePosition.margingTopBotton;
        this.margingLeftRight = relativePosition.margingLeftRight;
    }

    recalculateY() {
        let y = this.parent.y
        for (let child of this.parent.children) {
            y += child.margingTopBotton * 2 + child.heigth;
        }
        return y;
    }

    recalculateX() {
        return this.parent.x + this.margingLeftRight / 2;
    }

    draw() {
        this.x = this.recalculateX();
        this.y = this.recalculateY();
        console.log(`GridItem -> x: ${this.x}, y: ${this.y}, width: ${this.width}, heigth: ${this.heigth},`);
    }
}

class compositeGrid extends Graphic {
    children = [];
    x;
    y;
    heigth;
    width;

    constructor(name, coordenate) {
        super(name);
        this.x = coordenate.x;
        this.y = coordenate.y;

    }

    add(graphic) {
        this.children.push(graphic);
        graphic.parent = this;
        this.calculateHeight();
        this.calculateWidth();
    }

    calculateHeight() {
        let heigth = 0;
        for (let child of this.children) {
            heigth += child.heigth + child.margingTopBotton;
        }
        this.heigth = heigth;
    }

    calculateWidth() {
        let tempMax = 0;
        for (let child of this.children) {
            let totalWidth = child.width + child.margingLeftRight;
            tempMax = totalWidth > tempMax ? totalWidth : tempMax;
        }
        this.width = tempMax;
    }

    remove(graphic) {
        const componentIndex = this.children.indexOf(graphic);
        this.children.splice(componentIndex, 1);
        graphic.parent = null;
    }

    draw() {

        for (let child of this.children) {
            child.draw();
        }
        console.log(`Grid -> x: ${this.x}, y: ${this.y}, width: ${this.width}, heigth: ${this.heigth},`);
    }
}

const argentina = new compositeGrid("Argentina", { x: 0, y: 0 });
let relativePosition = {
    heigth: 10,
    width: 20,
    margingTopBotton: 2,
    margingLeftRight: 4
}
argentina.add(new LeafGridItem("credit", relativePosition));
argentina.add(new LeafGridItem("contrapartida", relativePosition));
argentina.add(new LeafGridItem("mercado", relativePosition));

argentina.draw();

