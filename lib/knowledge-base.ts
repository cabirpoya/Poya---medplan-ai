
export interface PlantInfo {
  scientificName: string;
  persianName: string;
  properties: string[];
  molecularProfile: string[];
  clinicalSafety: {
    toxicity: string;
    drugInteractions: string[];
    warnings: string[];
  };
  source: string;
}

// Data inlined to prevent module resolution errors with JSON imports in some environments
const plantData = {
  "plants": [
    {
      "scientificName": "Hypericum perforatum",
      "persianName": "خون‌آباده (علف چای)",
      "properties": ["ضد افسردگی", "شفا بخش زخم", "ضد التهاب", "ضد ویروس"],
      "molecularProfile": ["Hypericin", "Pseudohypericin", "Hyperforin", "Flavonoids"],
      "clinicalSafety": {
        "toxicity": "کم تا متوسط (در دوزهای بالا)",
        "drugInteractions": ["آنتی‌دپرسان‌ها (SSRI)", "وارفارین", "دیگوکسین", "قرص‌های ضد بارداری"],
        "warnings": ["افزایش حساسیت به نور (Photosensitivity)", "مصرف در بارداری محدود است", "قبل از جراحی قطع شود"]
      },
      "source": "اطلاعات تخصصی از منابع علمی ایرانی و فارماکوپه گیاهی"
    },
    {
      "scientificName": "Zingiber officinale",
      "persianName": "زنجبیل",
      "properties": ["تسکین استفراغ", "ضد التهاب", "تقویت گوارش", "ضد درد"],
      "molecularProfile": ["Gingerols", "Shogaols", "Zingerone", "Paradols"],
      "clinicalSafety": {
        "toxicity": "بسیار کم",
        "drugInteractions": ["داروهای ضد انعقاد (در دوز بالا)", "داروهای قلبی"],
        "warnings": ["در سنگ کیسه صفرا با احتیاط مصرف شود", "در مقادیر بالا ممکن است باعث سوزش سر دل شود"]
      },
      "source": "تحقیقات دانشگاه تهران - سال 1402"
    },
    {
      "scientificName": "Echium amoenum",
      "persianName": "گل گاوزبان ایرانی",
      "properties": ["آرام‌بخش", "نشان‌زدای افسردگی", "تقویت قلب", "ضد سرفه"],
      "molecularProfile": ["Rosmarinic acid", "Flavonoids", "Anthocyanins", "Pyrrolizidine alkaloids (trace)"],
      "clinicalSafety": {
        "toxicity": "احتمال سمیت کبدی در مصرف طولانی مدت (به دلیل آلکالوئیدها)",
        "drugInteractions": ["داروهای اعصاب مرکزی", "ضد انعقادها"],
        "warnings": ["مصرف طولانی مدت توصیه نمی‌شود", "در بارداری و شیردهی منع مصرف دارد"]
      },
      "source": "طب سنتی ایران و منابع نوین گیاه‌شناسی"
    },
    {
      "scientificName": "Mentha piperita",
      "persianName": "نعناع فلفلی",
      "properties": ["ضد نفخ", "ضد اسپاسم", "خنک کننده", "مسکن سردرد"],
      "molecularProfile": ["Menthol", "Menthone", "Rosmarinic acid", "Limonene"],
      "clinicalSafety": {
        "toxicity": "بسیار کم",
        "drugInteractions": ["سیکلوسپورین", "داروهای کاهش اسید معده"],
        "warnings": ["در ریفلاکس معده (GERD) ممکن است علائم را تشدید کند", "روغن خالص آن نباید خورده شود"]
      },
      "source": "منابع استاندارد گیاهان دارویی"
    }
  ]
};

export class KnowledgeBase {
  private staticPlants: PlantInfo[];
  private customPlants: PlantInfo[];

  constructor() {
    this.staticPlants = plantData.plants as PlantInfo[];
    this.customPlants = this.loadCustomPlants();
  }

  private loadCustomPlants(): PlantInfo[] {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('medplant_custom_knowledge');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  }

  addPlant(plant: PlantInfo): void {
    // Add custom source tag if missing
    if (!plant.source) {
      plant.source = "افزوده شده توسط کاربر (یادگیری سیستم)";
    }
    
    this.customPlants.push(plant);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('medplant_custom_knowledge', JSON.stringify(this.customPlants));
    }
  }

  findPlant(name: string): PlantInfo | undefined {
    const allPlants = [...this.customPlants, ...this.staticPlants];
    return allPlants.find(
      plant => 
        plant.scientificName.toLowerCase().includes(name.toLowerCase()) ||
        plant.persianName.includes(name)
    );
  }

  getAllPlants(): PlantInfo[] {
    return [...this.customPlants, ...this.staticPlants];
  }

  getSourceInfo(): string {
    return "اطلاعات این بخش ترکیبی از منابع علمی و دانش افزوده شده توسط کاربران است.";
  }
}
