import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/styles/Product.css';
import ProductCard from '../components/common/ProductCard';
import { PRODUCTS_DATA } from '../services/products';
import { useCart } from './CartDrawer';

function Products() {
    const { addToCart } = useCart();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        categories: [],
        brands: [],
        nutrition: [],
        sortBy: 'name'
    });

    const [categoryCounts, setCategoryCounts] = useState({});
    const [brandCounts, setBrandCounts] = useState({});
    const [nutritionCounts, setNutritionCounts] = useState({});

    useEffect(() => {
        // Flatten all products from all categories
        const allProducts = PRODUCTS_DATA.flatMap(category =>
            category.products.map(product => ({
                ...product,
                categoryName: category.name
            }))
        );
        setProducts(allProducts);
        setFilteredProducts(allProducts);

        // Calculate counts
        const catCounts = {};
        const brandCounts = {};
        const nutritionCounts = {
            'High Fiber': 0,
            'Low Sugar': 0
        };

        allProducts.forEach(product => {
            // Category counts
            catCounts[product.categoryName] = (catCounts[product.categoryName] || 0) + 1;

            // Brand counts (example brands)
            const brand = 'Organic Farms'; // Default brand for demo
            brandCounts[brand] = (brandCounts[brand] || 0) + 1;

            // Nutrition counts (simplified logic)
            if (product.name.toLowerCase().includes('grain') || product.name.toLowerCase().includes('rice')) {
                nutritionCounts['High Fiber']++;
            }
            if (product.name.toLowerCase().includes('milk') || product.name.toLowerCase().includes('dairy')) {
                nutritionCounts['Low Sugar']++;
            }
        });

        setCategoryCounts(catCounts);
        setBrandCounts(brandCounts);
        setNutritionCounts(nutritionCounts);
    }, []);

    // Sync URL search param with filters
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get('search');
        if (searchQuery) {
            setFilters(prev => ({ ...prev, search: searchQuery }));
        }
    }, [location.search]);

    useEffect(() => {
        let filtered = [...products];

        // Filter by search
        if (filters.search) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        // Filter by categories
        if (filters.categories.length > 0) {
            filtered = filtered.filter(product =>
                filters.categories.includes(product.categoryName)
            );
        }

        // Filter by brands
        if (filters.brands.length > 0) {
            filtered = filtered.filter(product =>
                filters.brands.some(brand =>
                    product.name.toLowerCase().includes(brand.toLowerCase())
                )
            );
        }

        // Filter by nutrition
        if (filters.nutrition.includes('High Fiber')) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes('grain') ||
                product.name.toLowerCase().includes('rice')
            );
        }
        if (filters.nutrition.includes('Low Sugar')) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes('milk') ||
                product.name.toLowerCase().includes('dairy')
            );
        }

        // Sort products
        switch (filters.sortBy) {
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    }, [products, filters]);

    const handleFilterChange = (filterType, value) => {
        if (filterType === 'search' || filterType === 'sortBy') {
            setFilters(prev => ({
                ...prev,
                [filterType]: value
            }));
        } else {
            // Handle array-based filters (categories, brands, nutrition)
            setFilters(prev => {
                const currentArray = prev[filterType] || [];
                if (currentArray.includes(value)) {
                    // Remove value if already selected
                    return {
                        ...prev,
                        [filterType]: currentArray.filter(item => item !== value)
                    };
                } else {
                    // Add value if not selected
                    return {
                        ...prev,
                        [filterType]: [...currentArray, value]
                    };
                }
            });
        }
    };

    const clearFilterGroup = (filterType) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: filterType === 'search' ? '' : []
        }));
    };

    const applyFilters = () => {
        // Filters are already applied in real-time via useEffect
        console.log('Filters applied:', filters);
    };

    const categories = Object.keys(categoryCounts);
    const brands = Object.keys(brandCounts);
    const nutritionOptions = Object.keys(nutritionCounts);

    return (
        <div className="products-page">
            {/* Left Sidebar - Filters */}
            <aside className="filters-sidebar">
                <div className="filter-section-container">
                    {/* Search Bar */}
                    <div className="filter-search-container">
                        <i className="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="filter-search-input"
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="filter-group">
                        <div className="filter-title">
                            Category
                            <a href="#" className="clear-all" onClick={(e) => { e.preventDefault(); clearFilterGroup('categories'); }}>Clear</a>
                        </div>
                        <ul className="filter-options">
                            {categories.map(category => (
                                <li key={category} className="filter-option">
                                    <input
                                        type="checkbox"
                                        id={`cat${category.replace(/\s+/g, '')}`}
                                        className="filter-checkbox"
                                        checked={filters.categories.includes(category)}
                                        onChange={() => handleFilterChange('categories', category)}
                                    />
                                    <label htmlFor={`cat${category.replace(/\s+/g, '')}`} className="filter-label">
                                        {category}
                                        <span className="filter-count">({categoryCounts[category] || 0})</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Brand Filter */}
                    <div className="filter-group">
                        <div className="filter-title">
                            Brand
                            <a href="#" className="clear-all" onClick={(e) => { e.preventDefault(); clearFilterGroup('brands'); }}>Clear</a>
                        </div>
                        <ul className="filter-options">
                            <li className="filter-option">
                                <input
                                    type="checkbox"
                                    id="allBrands"
                                    className="filter-checkbox"
                                    checked={filters.brands.length === 0}
                                    onChange={() => clearFilterGroup('brands')}
                                />
                                <label htmlFor="allBrands" className="filter-label">
                                    All Brands
                                    <span className="filter-count">({products.length})</span>
                                </label>
                            </li>
                            {brands.map(brand => (
                                <li key={brand} className="filter-option">
                                    <input
                                        type="checkbox"
                                        id={`brand${brand.replace(/\s+/g, '')}`}
                                        className="filter-checkbox"
                                        checked={filters.brands.includes(brand)}
                                        onChange={() => handleFilterChange('brands', brand)}
                                    />
                                    <label htmlFor={`brand${brand.replace(/\s+/g, '')}`} className="filter-label">
                                        {brand}
                                        <span className="filter-count">({brandCounts[brand] || 0})</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Nutrition Filter */}
                    <div className="filter-group">
                        <div className="filter-title">
                            Nutrition
                            <a href="#" className="clear-all" onClick={(e) => { e.preventDefault(); clearFilterGroup('nutrition'); }}>Clear</a>
                        </div>
                        <ul className="filter-options">
                            {nutritionOptions.map(nutrition => (
                                <li key={nutrition} className="filter-option">
                                    <input
                                        type="checkbox"
                                        id={`nut${nutrition.replace(/\s+/g, '')}`}
                                        className="filter-checkbox"
                                        checked={filters.nutrition.includes(nutrition)}
                                        onChange={() => handleFilterChange('nutrition', nutrition)}
                                    />
                                    <label htmlFor={`nut${nutrition.replace(/\s+/g, '')}`} className="filter-label">
                                        {nutrition}
                                        <span className="filter-count">({nutritionCounts[nutrition] || 0})</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button className="apply-button" onClick={applyFilters}>Add to Filter</button>
                </div>
            </aside>

            {/* Right Side - Products Grid */}
            <main className="products-main">
                <div className="products-header">
                    <h1>All Products</h1>
                    <p className="results-count">
                        Showing {filteredProducts.length} of {products.length} products
                    </p>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="no-products">
                        <h3>No products found</h3>
                        <p>Try adjusting your filters</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={(product, quantity) => addToCart(product, quantity)}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Products;