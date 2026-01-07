import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Products from src/data/products.js
const products = [
  {
    id: '1',
    name: 'Fosroc Nitobond SBR',
    category: 'waterproofing',
    description: 'Styrene Butadiene Rubber (SBR) latex for waterproofing and bonding applications',
    applications: ['Basement waterproofing', 'Terrace waterproofing', 'Bonding agent'],
    specifications: 'Liquid polymer, ready to use',
    packaging: '20L, 200L',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Fosroc Nitobond EP',
    category: 'waterproofing',
    description: 'Epoxy-based waterproofing system for critical areas',
    applications: ['Tank waterproofing', 'Underground structures', 'Swimming pools'],
    specifications: 'Two-component epoxy system',
    packaging: '20L kit',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Fosroc Nitobond AR',
    category: 'waterproofing',
    description: 'Acrylic-based waterproofing membrane',
    applications: ['Roof waterproofing', 'Bathroom waterproofing', 'Balcony waterproofing'],
    specifications: 'Single component, flexible membrane',
    packaging: '20L, 200L',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Fosroc Renderoc HB',
    category: 'waterproofing',
    description: 'High-build waterproofing render for external walls',
    applications: ['External wall protection', 'Waterproof rendering', 'Damp proofing'],
    specifications: 'Cementitious waterproof coating',
    packaging: '25kg bags',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Fosroc Conplast SP430',
    category: 'admixtures',
    description: 'Superplasticizer for high-strength concrete',
    applications: ['High-strength concrete', 'Precast concrete', 'Pumped concrete'],
    specifications: 'Sulfonated naphthalene formaldehyde condensate',
    packaging: '20L, 200L',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Fosroc Conplast NC',
    category: 'admixtures',
    description: 'Normal set superplasticizer for improved workability',
    applications: ['General concrete', 'Ready-mix concrete', 'Slab construction'],
    specifications: 'Sulfonated naphthalene-based',
    packaging: '20L, 200L',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Fosroc Conplast RP264',
    category: 'admixtures',
    description: 'Retarding plasticizer for extended workability',
    applications: ['Hot weather concreting', 'Long-distance transportation', 'Large pours'],
    specifications: 'Retarding superplasticizer',
    packaging: '20L, 200L',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Fosroc Conplast AC',
    category: 'admixtures',
    description: 'Accelerating admixture for early strength gain',
    applications: ['Early formwork removal', 'Cold weather concreting', 'Rapid construction'],
    specifications: 'Calcium chloride-free accelerator',
    packaging: '20L, 200L',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Fosroc Renderoc GP',
    category: 'grouts',
    description: 'General purpose grout for structural applications',
    applications: ['Base plate grouting', 'Anchor grouting', 'Machine foundation'],
    specifications: 'Non-shrink, high-strength grout',
    packaging: '25kg bags',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '10',
    name: 'Fosroc Renderoc HS',
    category: 'grouts',
    description: 'High-strength grout for critical applications',
    applications: ['Heavy machinery', 'Precision grouting', 'Structural repairs'],
    specifications: 'Ultra-high strength, flowable',
    packaging: '25kg bags',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '11',
    name: 'Fosroc Nitomortar',
    category: 'grouts',
    description: 'Repair mortar for concrete restoration',
    applications: ['Concrete repairs', 'Spall repairs', 'Structural restoration'],
    specifications: 'Polymer-modified repair mortar',
    packaging: '25kg bags',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '12',
    name: 'Fosroc Nitofill',
    category: 'grouts',
    description: 'Non-shrink grout for precision applications',
    applications: ['Anchor installation', 'Post-tensioning', 'Precision grouting'],
    specifications: 'Expansive, non-shrink grout',
    packaging: '25kg bags',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '13',
    name: 'Fosroc Nitoseal MS',
    category: 'sealants',
    description: 'MS Polymer sealant for joints and gaps',
    applications: ['Expansion joints', 'Window sealing', 'Panel joints'],
    specifications: 'One-component, moisture-curing',
    packaging: '310ml, 600ml cartridges',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '14',
    name: 'Fosroc Nitoseal PU',
    category: 'sealants',
    description: 'Polyurethane sealant for flexible joints',
    applications: ['Concrete joints', 'Roof joints', 'Facade sealing'],
    specifications: 'Two-component polyurethane',
    packaging: '20L kit',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '15',
    name: 'Fosroc Nitobond EPX',
    category: 'sealants',
    description: 'Epoxy adhesive for structural bonding',
    applications: ['Steel bonding', 'Concrete bonding', 'Anchor bonding'],
    specifications: 'Two-component epoxy adhesive',
    packaging: '20L kit',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '16',
    name: 'Fosroc Nitobond PVA',
    category: 'sealants',
    description: 'PVA bonding agent for concrete',
    applications: ['Concrete bonding', 'Plaster bonding', 'Tile bonding'],
    specifications: 'Polyvinyl acetate emulsion',
    packaging: '20L, 200L',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '17',
    name: 'Fosroc Renderoc DS',
    category: 'protection',
    description: 'Damp-proofing slurry for below-grade protection',
    applications: ['Basement protection', 'Foundation protection', 'Damp proofing'],
    specifications: 'Cementitious waterproof coating',
    packaging: '25kg bags',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '18',
    name: 'Fosroc Nitocote EP',
    category: 'protection',
    description: 'Epoxy coating for chemical resistance',
    applications: ['Chemical storage', 'Industrial floors', 'Tank linings'],
    specifications: 'Two-component epoxy coating',
    packaging: '20L kit',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '19',
    name: 'Fosroc Renderoc Patch',
    category: 'protection',
    description: 'Rapid-setting repair mortar',
    applications: ['Quick repairs', 'Emergency repairs', 'Patch repairs'],
    specifications: 'Fast-setting, high-strength',
    packaging: '25kg bags',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '20',
    name: 'Fosroc Nitocote PU',
    category: 'protection',
    description: 'Polyurethane coating for weather protection',
    applications: ['Roof protection', 'Terrace protection', 'Weatherproofing'],
    specifications: 'Two-component polyurethane',
    packaging: '20L kit',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '21',
    name: 'Fosroc Renderoc Floor',
    category: 'flooring',
    description: 'Self-leveling floor compound',
    applications: ['Industrial floors', 'Warehouse floors', 'Smooth finishes'],
    specifications: 'Self-leveling, high-strength',
    packaging: '25kg bags',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '22',
    name: 'Fosroc Nitocote FC',
    category: 'flooring',
    description: 'Floor coating for heavy-duty applications',
    applications: ['Heavy traffic areas', 'Industrial facilities', 'Garage floors'],
    specifications: 'Epoxy-based floor coating',
    packaging: '20L kit',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '23',
    name: 'Fosroc Renderoc Hard',
    category: 'flooring',
    description: 'Hard-wearing floor topping',
    applications: ['Abrasion resistance', 'Heavy-duty floors', 'Industrial applications'],
    specifications: 'High-abrasion resistance',
    packaging: '25kg bags',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '24',
    name: 'Fosroc Nitocote TC',
    category: 'flooring',
    description: 'Traffic coating for industrial floors',
    applications: ['Vehicle traffic', 'Heavy machinery', 'Loading areas'],
    specifications: 'Polyurethane traffic coating',
    packaging: '20L kit',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const dataDir = path.join(__dirname, 'data');
const productsFile = path.join(dataDir, 'products.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Write products to file
fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
console.log(`✅ Successfully initialized ${products.length} products in ${productsFile}`);

