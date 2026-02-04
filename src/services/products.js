import img1 from '../assets/images/1.JPG';
import img2 from '../assets/images/2.JPG';
import img4 from '../assets/images/3.JPG';

export const PRODUCTS_DATA = [
    {
        id: 'vegetables',
        title: 'Fresh Vegetables',
        products: [
            { id: 101, name: 'Fresh Onions', price: 45.00, originalPrice: 55.00, discount: 15, image: img1, unit: '1 kg' },
            { id: 102, name: 'Tomatoes', price: 30.00, originalPrice: 40.00, discount: 25, image: img2, unit: '1 kg' },
            { id: 103, name: 'Potatoes', price: 35.00, originalPrice: 45.00, discount: 22, image: img4, unit: '1 kg' },
            { id: 104, name: 'Carrots', price: 60.00, originalPrice: 70.00, discount: 14, image: img1, unit: '500g' },
        ]
    },
    {
        id: 'fruits',
        title: 'Fresh Fruits',
        products: [
            { id: 201, name: 'Apples', price: 120.00, originalPrice: 150.00, discount: 20, image: img2, unit: '1 kg' },
            { id: 202, name: 'Bananas', price: 40.00, originalPrice: 50.00, discount: 20, image: img4, unit: '1 dozen' },
            { id: 203, name: 'Oranges', price: 80.00, originalPrice: 100.00, discount: 20, image: img1, unit: '1 kg' },
            { id: 204, name: 'Grapes', price: 90.00, originalPrice: 110.00, discount: 18, image: img2, unit: '500g' },
        ]
    },
    {
        id: 'dairy',
        title: 'Dairy Products',
        products: [
            { id: 301, name: 'Fresh Milk', price: 50.00, originalPrice: 55.00, discount: 9, image: img4, unit: '1 L' },
            { id: 302, name: 'Curd', price: 30.00, originalPrice: 35.00, discount: 14, image: img1, unit: '500g' },
        ]
    },
    {
        id: 'rice-grains',
        title: 'Rice & Grains',
        products: [
            { id: 401, name: 'Basmati Rice', price: 150.00, originalPrice: 180.00, discount: 16, image: img2, unit: '1 kg' },
            { id: 402, name: 'Wheat Flour', price: 55.00, originalPrice: 65.00, discount: 15, image: img4, unit: '1 kg' },
        ]
    },
    {
        id: 'spices',
        title: 'Spices & Masala',
        products: [
            { id: 501, name: 'Turmeric Powder', price: 40.00, originalPrice: 45.00, discount: 11, image: img1, unit: '100g' },
            { id: 502, name: 'Chilli Powder', price: 45.00, originalPrice: 50.00, discount: 10, image: img2, unit: '100g' },
        ]
    },
    {
        id: 'household',
        title: 'Household Items',
        products: [
            { id: 601, name: 'Detergent', price: 210.00, originalPrice: 230.00, discount: 8, image: img4, unit: '1 kg' },
            { id: 602, name: 'Dish Soap', price: 40.00, originalPrice: 45.00, discount: 11, image: img1, unit: '500ml' },
        ]
    },
    {
        id: 'bakery',
        title: 'Bakery & Snacks',
        products: [
            { id: 701, name: 'Bread', price: 40.00, originalPrice: 45.00, discount: 11, image: img2, unit: '1 pack' },
            { id: 702, name: 'Biscuits', price: 20.00, originalPrice: 25.00, discount: 20, image: img4, unit: '1 pack' },
        ]
    }
];
