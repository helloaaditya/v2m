# Product Template Guide

Use this template to add your 54 products. You can either:
1. Add them directly to `src/data/products.js` file
2. Add them through the Admin Panel (Product Management section)

## Product Format

Each product should follow this structure:

```javascript
{
  id: 25, // Unique number (continue from 24)
  name: 'Product Name', // Full product name
  category: 'waterproofing', // One of: 'waterproofing', 'admixtures', 'grouts', 'sealants', 'protection', 'flooring'
  description: 'Detailed description of the product and its uses',
  applications: [
    'Application 1',
    'Application 2',
    'Application 3'
  ],
  specifications: 'Technical specifications, dosage, coverage, etc.',
  packaging: '20L, 200L' // Available packaging sizes
}
```

## Category IDs

- `waterproofing` - Advanced Waterproofing Solutions 💧
- `admixtures` - High-Performance Concrete Admixtures 🏗️
- `grouts` - Grouts, Anchors & Precision Repair Materials 🔩
- `sealants` - Sealants, Adhesives & Jointing Compounds 🔗
- `protection` - Concrete Protection & Restoration Systems 🛡️
- `flooring` - Industrial Flooring and Coating Solutions 🏭

## Example Product Entry

```javascript
{
  id: 25,
  name: 'Fosroc Nitobond SBR Plus',
  category: 'waterproofing',
  description: 'Enhanced SBR latex with improved bonding strength and waterproofing properties for critical applications',
  applications: [
    'Basement waterproofing',
    'Terrace waterproofing',
    'Swimming pool waterproofing',
    'Water tank lining'
  ],
  specifications: 'Coverage: 1.5-2.0 kg/sqm per coat, Mix ratio: 1:1 with cement',
  packaging: '20L, 200L drums'
}
```

## Quick Add Template

Copy and paste this template for each product:

```javascript
{
  id: XX,
  name: '',
  category: '',
  description: '',
  applications: [
    '',
    '',
    ''
  ],
  specifications: '',
  packaging: ''
},
```

## Current Status

- **Existing products:** 24
- **Target:** 54 products
- **Remaining:** 30 products

## Tips

1. **ID Numbers:** Continue from 25 onwards
2. **Category:** Choose the most appropriate category
3. **Applications:** List 3-5 key applications
4. **Specifications:** Include technical details like dosage, coverage, mix ratios
5. **Packaging:** List all available sizes

## Adding via Admin Panel

1. Login to Admin Panel: `http://localhost:3000/admin/login`
2. Go to "Products" tab
3. Click "Add Product"
4. Fill in all fields
5. Save

The product will be automatically added to the website!

