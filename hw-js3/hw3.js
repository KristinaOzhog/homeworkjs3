class Good {
    constructor(id, name, description, size, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.size = size;
        this.price = price;
        this.available = available;
    }

    setAvailable(status) {
        this.available = status
    }
}

class GoodsList {
    #goods
    constructor(filter, sortPrice, sortDir) {
        this.#goods = [];
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }
    get list() {
        const forSaleList = this.#goods.filter(good => this.filter.test(good.name));
        
        if (!this.sortPrice) {
            return forSaleList;
        }

        if (this.sortDir) {
            return forSaleList.sort((a, b) => (a.price - b.price));
        }
        return forSaleList.sort((a, b) => (b.price - a.price));
    }

    add(newGood) {
        this.#goods.push(newGood);
        let result = this.#goods;
        return result
    }

    remove(id) {
        this.#goods.forEach((good, index) => {
            if (good.id == id) {
                this.#goods.splice(index, 1);
                return this.#goods
            } 
        });
    }
}

class BasketGood extends Good {
    constructor(id, name, description, size, price, available, amount) {
        super(id, name, description, size, price, available);
        this.amount = amount;
    }
}

class Basket {
    constructor() {
        this.goods = [];
    }

    get totalAmount(){
        return this.goods.map(item => item.amount).reduce((a, b) => a + b, 0)        
    }

    get totalSum() {
        return this.goods.reduce((a, b) => a + b.amount * b.price, 0);
    }

    add(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            this.goods[index].amount += amount;
        } else {
            let addGood = new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
            this.goods.push(addGood);
        } 
    }

    remove(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            if (this.goods[index].amount - amount <= 0 || amount === 0) {
                this.goods.splice(index, 1);
            } else {
                this.goods[index].amount -= amount;
            }
        } 
    }

    clear() {
        this.goods.splice(0, this.goods.length)
    }

    removeUnavailable() {
        // this.goods = this.goods.filter(good => good.available === true)
        // return this.goods;
        this.goods.forEach((good, index) => {
            if (good.available == false) {
                this.goods.splice(index, 1);
                return this.goods
            } 
        });
                        
    }
}


const goodOne = new Good(1, 'skirt', 'cool skirt', ['xs', 's', 'm', 'l', 'xl'], 1000, true);
const goodTwo = new Good(2, 'short', 'cool short', ['xs', 's', 'm', 'l', 'xl'], 800, true);
const goodThree = new Good(3, 'jeans', 'cool jeans', ['xs', 's', 'm', 'l', 'xl'], 2500, true);
const goodFour = new Good(4, 'dress', 'cool dress', ['xs', 's', 'm', 'l', 'xl'], 1500, true);
const goodFive = new Good(5, 'sweater', 'cool sweater', ['xs', 's', 'm', 'l', 'xl'], 1200, true);

goodThree.setAvailable(false);

console.log(goodThree)

const catalog = new GoodsList(/dress/i, true, false);

catalog.add(goodOne,);
catalog.add(goodFour);
catalog.add(goodFour);

console.log(`Goods in catalog: `, catalog.list);

catalog.sortPrice = true;
catalog.sortDir = false;

console.log(`Sorted by price in descending order: `, catalog.list);

catalog.remove(4);
console.log(`Removing item from catalog:`, catalog.list);

const basket = new Basket();

basket.add(goodOne, 4);
basket.add(goodThree, 2);
basket.add(goodFour, 6);

console.log(basket)


console.log(`Total items in basket: ${basket.totalAmount}`);
console.log(`Total sum for ${basket.totalAmount} items in basket: $${basket.totalSum}`);

basket.remove(goodOne, 2);
basket.remove(goodThree, 2);
basket.remove(goodFour, 3);

console.log(basket.goods)

basket.removeUnavailable();

console.log(basket.goods)

basket.clear();

console.log(basket.goods)