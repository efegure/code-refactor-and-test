export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class CodeRefactorFrontEnd {
  items: Array<Item>;
  private specialItems: Record<string, { process: (product: Item) => void }> = {
    "Vintage Framework": {
      process: (product: Item) => {
        product.quality = Math.min(
          50,
          product.quality + (product.sellIn > 0 ? 1 : 2),
        );
        product.sellIn -= 1;
      },
    },
    "Eternal Code License": {
      process: (product: Item) => {
        product.quality = 80;
        // product.sellIn -= 1;
      },
    },
    "Conference Pass for DevDays 2025": {
      process: (product: Item) => {
        if (product.sellIn > 0) {
          product.quality = Math.min(
            50,
            product.quality +
              (product.sellIn > 10 ? 1 : product.sellIn > 5 ? 2 : 3),
          );
        } else {
          product.quality = 0;
        }

        product.sellIn -= 1;
      },
    },
    "Deprecated Library": {
      process: (product: Item) => {
        product.quality = Math.max(
          0,
          product.quality - (product.sellIn > 0 ? 1 : 2),
        );
        product.sellIn -= 1;
      },
    },
  };

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private isSpecial(product: Item): boolean {
    return Object.keys(this.specialItems).includes(product.name);
  }

  private processItem(product: Item): void {
    product.quality = Math.max(
      0,
      product.quality - (product.sellIn > 0 ? 1 : 2),
    );
    product.sellIn -= 1;
  }

  private processSpeialItem(product: Item): void {
    this.specialItems[product.name].process(product);
  }

  updateQuality() {
    this.items.forEach((product) => {
      if (this.isSpecial(product)) {
        this.processSpeialItem(product);
      } else {
        this.processItem(product);
      }
    });
    return this.items;
    // for (let i = 0; i < this.items.length; i++) {
    //   if (
    //     this.items[i].name != "Vintage Framework" &&
    //     this.items[i].name != "Conference Pass for DevDays 2025"
    //   ) {
    //     if (this.items[i].quality > 0) {
    //       if (this.items[i].name != "Eternal Code License") {
    //         this.items[i].quality = this.items[i].quality - 1;
    //       }
    //     }
    //   } else {
    //     if (this.items[i].quality < 50) {
    //       this.items[i].quality = this.items[i].quality + 1;
    //       if (this.items[i].name == "Conference Pass for DevDays 2025") {
    //         if (this.items[i].sellIn < 11) {
    //           if (this.items[i].quality < 50) {
    //             this.items[i].quality = this.items[i].quality + 1;
    //           }
    //         }
    //         if (this.items[i].sellIn < 6) {
    //           if (this.items[i].quality < 50) {
    //             this.items[i].quality = this.items[i].quality + 1;
    //           }
    //         }
    //       }
    //     }
    //   }
    //   if (this.items[i].name != "Eternal Code License") {
    //     this.items[i].sellIn = this.items[i].sellIn - 1;
    //   }
    //   if (this.items[i].sellIn < 0) {
    //     if (this.items[i].name != "Vintage Framework") {
    //       if (this.items[i].name != "Conference Pass for DevDays 2025") {
    //         if (this.items[i].quality > 0) {
    //           if (this.items[i].name != "Eternal Code License") {
    //             this.items[i].quality = this.items[i].quality - 1;
    //           }
    //         }
    //       } else {
    //         this.items[i].quality =
    //           this.items[i].quality - this.items[i].quality;
    //       }
    //     } else {
    //       if (this.items[i].quality < 50) {
    //         this.items[i].quality = this.items[i].quality + 1;
    //       }
    //     }
    //   }
    // }

    // return this.items;
  }
}
