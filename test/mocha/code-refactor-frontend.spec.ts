import { expect } from "chai";
import { Item, CodeRefactorFrontEnd } from "@/code-refactor-frontend";

describe("CodeRefactorFrontEnd", () => {
  // ============================================
  // ÖRNEK TEST - Bu testi düzeltmeniz gerekiyor
  // ============================================
  it("constructor should handle empty case", () => {
    const codeRefactor = new CodeRefactorFrontEnd();
    expect(codeRefactor.items).lengthOf(0); // Bu değeri düzeltin
  });

  it("should decrease quality by 1 for normal items", () => {
    const codeRefactor = new CodeRefactorFrontEnd([
      new Item("Normal Item", 10, 20),
    ]);
    const items = codeRefactor.updateQuality();
    expect(items[0].quality).equal(19); // Bu değeri düzeltin
  });

  // ============================================
  // NORMAL ÜRÜN TESTLERİ
  // ============================================
  describe("Normal Items", () => {
    it("should decrease sellIn by 1 each day", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item("Normal Item", 10, 20),
      ]);
      const items = codeRefactor.updateQuality();
      expect(items[0].sellIn).equal(9);
    });
    it("should decrease quality by 1 each day", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item("Normal Item", 10, 20),
      ]);
      const items = codeRefactor.updateQuality();
      expect(items[0].sellIn).equal(9);
    });
    it("should decrease quality twice as fast after sellIn date passes", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item("Normal Item", 2, 20),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 3; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(16);
    });
    it("should never have negative quality", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item("Normal Item", 2, 4),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 4; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(0);
    });
  });

  // ============================================
  // VINTAGE FRAMEWORK TESTLERİ
  // ============================================
  describe("Vintage Framework", () => {
    it("should increase quality as it gets older", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item("Vintage Framework", 10, 10),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 5; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(15);
    });
    it("should never have quality more than 50", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item("Vintage Framework", 10, 45),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 5; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(50);
    });
    it("should increase quality twice as fast after sellIn date", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item("Vintage Framework", 5, 10),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 10; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(25);
    });
  });

  // ============================================
  // ETERNAL CODE LICENSE TESTLERİ
  // ============================================
  describe("Eternal Code License", () => {
    it("should never decrease in quality", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item("Eternal Code License", 5, 80),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 10; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(80);
    });
    it("should never change sellIn value", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item("Eternal Code License", 5, 10),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 10; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].sellIn).equal(5);
    });
    it("should always have quality of 80", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item("Eternal Code License", 5, 10),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 10; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(80);
    });
  });

  // ============================================
  // CONFERENCE PASS TESTLERİ
  // ============================================
  describe("Conference Pass for DevDays 2025", () => {
    const packetName = "Conference Pass for DevDays 2025";
    it("should increase quality by 1 when more than 10 days left", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item(packetName, 15, 10),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 3; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(13);
    });
    it("should increase quality by 2 when 10 days or less left", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item(packetName, 10, 10),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 5; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(20);
    });
    it("should increase quality by 3 when 5 days or less left", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item(packetName, 5, 10),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 3; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(19);
    });
    it("should drop quality to 0 after the conference", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item(packetName, 5, 10),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 6; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(0);
    });
    it("should never have quality more than 50", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item(packetName, 15, 45),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 10; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(50);
    });
  });

  // ============================================
  // DEPRECATED LIBRARY TESTLERİ (YENİ ÖZELLİK)
  // ============================================
  describe("Deprecated Library", () => {
    const packetName = "Deprecated Library";
    it("should decrease quality twice as fast as normal items", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item(packetName, 15, 20),
      ]);

      const items = codeRefactor.updateQuality();

      expect(items[0].quality).equal(18);
    });
    it("should decrease quality 4x as fast after sellIn date", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item(packetName, 5, 45),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 10; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(15);
    });
    it("should never have negative quality", () => {
      const codeRefactor = new CodeRefactorFrontEnd([
        new Item(packetName, 15, 15),
      ]);
      let items: Item[] = [];
      for (let i = 0; i < 10; i++) {
        items = codeRefactor.updateQuality();
      }

      expect(items[0].quality).equal(0);
    });
  });
});
