import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Search, SlidersHorizontal, RotateCcw, LayoutGrid, Image as ImageIcon, Eye, ShoppingBag } from 'lucide-react';

interface CollectionGridProps {
  onSelectProduct: (product: Product) => void;
  activeCategoryFilter?: string;
  onCategoryChange?: (category: string) => void;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({
  onSelectProduct,
  activeCategoryFilter = 'All',
  onCategoryChange,
}) => {
  const { formatPrice, addToCart } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryFilter);
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'editorial'>('grid');

  React.useEffect(() => {
    if (activeCategoryFilter) {
      setSelectedCategory(activeCategoryFilter);
    }
  }, [activeCategoryFilter]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  const categories = [
    'All',
    'Summer Lawn 3-Piece',
    'Handcrafted Chikankari',
    'Festive Pret',
    'Chiffon & Silk',
  ];

  const colors = [
    'All',
    'Emerald Pine',
    'Pistachio Sage',
    'Tea Rose Blush',
    'Ivory Pearl',
    'Saffron Ochre',
    'Pastel Lilac',
    'Powder Indigo',
  ];

  const fabrics = [
    'All',
    'Combed 80s Swiss Lawn',
    'Pure Cotton Mulmul',
    'Cotton Net',
    'Silk Lawn',
    'Swiss Voile',
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      if (selectedColor !== 'All' && product.colorFamily !== selectedColor) {
        return false;
      }
      if (selectedFabric !== 'All' && !product.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesUrdu = product.urduName.includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesUrdu && !matchesFabric && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.basePricePKR - b.basePricePKR;
      if (sortBy === 'price-high') return b.basePricePKR - a.basePricePKR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
    });
  }, [selectedCategory, selectedColor, selectedFabric, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedColor('All');
    setSelectedFabric('All');
    setSearchQuery('');
    setSortBy('featured');
    if (onCategoryChange) onCategoryChange('All');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedColor !== 'All' ||
    selectedFabric !== 'All' ||
    searchQuery !== '';

  return (
    <section id="collection" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#F9D2BA] gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#5E3122] font-semibold">
            <span>Indus Heritage Atelier</span>
            <span aria-hidden="true">·</span>
            <span>Unstitched & Stitched</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1D4533] mt-2">
            The Summer '26 Curation
          </h2>
          <p className="text-sm text-[#5E3122]/80 mt-2 max-w-xl">
            Each ensemble is woven to withstand peak subtropical summers—featuring breathable
            Pima cotton, Multani needlecraft, and diaphanous dupattas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5E3122]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lawn, chikankari..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#F9D2BA] rounded focus:outline-none focus:border-[#1D4533] text-[#1D4533] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-white border border-[#F9D2BA] rounded focus:outline-none focus:border-[#1D4533] cursor-pointer text-[#5E3122]"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* View Mode Toggle: Grid vs Editorial Full Picture View */}
            <div className="hidden sm:flex border border-[#F9D2BA] bg-white rounded overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#1D4533] text-[#F7EAE0]'
                    : 'text-[#5E3122] hover:bg-[#F7EAE0]'
                }`}
                title="Standard 3-Column Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('editorial')}
                className={`p-2 transition-colors cursor-pointer ${
                  viewMode === 'editorial'
                    ? 'bg-[#1D4533] text-[#F7EAE0]'
                    : 'text-[#5E3122] hover:bg-[#F7EAE0]'
                }`}
                title="Large Editorial Picture View"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              className={`p-2 border rounded transition-colors text-xs flex items-center gap-1.5 cursor-pointer ${
                isFiltersExpanded || hasActiveFilters
                  ? 'border-[#1D4533] bg-[#F7EAE0] text-[#1D4533]'
                  : 'border-[#F9D2BA] bg-white text-[#5E3122]'
              }`}
              title="Toggle Detailed Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="py-6 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 text-xs font-medium tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer rounded-none border ${
                selectedCategory === cat
                  ? 'bg-[#1D4533] text-[#F7EAE0] border-[#1D4533]'
                  : 'bg-white text-[#5E3122] border-[#F9D2BA] hover:border-[#1D4533] hover:text-[#1D4533]'
              }`}
            >
              {cat === 'All' ? 'All Collections' : cat}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-[#5E3122] hover:underline flex items-center gap-1 font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {isFiltersExpanded && (
        <div className="mb-8 p-5 bg-[#F7EAE0] border border-[#F9D2BA] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#5E3122] mb-2">
              Color Palette
            </label>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-2.5 py-1.5 rounded-none border text-[11px] cursor-pointer transition-colors ${
                    selectedColor === c
                      ? 'bg-[#1D4533] text-[#F7EAE0] border-[#1D4533]'
                      : 'bg-white text-[#5E3122] border-[#F9D2BA] hover:border-[#1D4533]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#5E3122] mb-2">
              Heritage Fabric
            </label>
            <div className="flex flex-wrap gap-2">
              {fabrics.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFabric(f)}
                  className={`px-2.5 py-1.5 rounded-none border text-[11px] cursor-pointer transition-colors ${
                    selectedFabric === f
                      ? 'bg-[#1D4533] text-[#F7EAE0] border-[#1D4533]'
                      : 'bg-white text-[#5E3122] border-[#F9D2BA] hover:border-[#1D4533]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center bg-white p-3 border border-[#F9D2BA]">
            <p className="font-serif font-medium text-sm text-[#1D4533]">
              Custom Tailoring Promise
            </p>
            <p className="text-[#5E3122]/70 text-[11px] mt-1">
              Select any design unstitched or let our master tailors stitch standard sizes or bespoke
              measurements with organza finishing.
            </p>
          </div>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between text-xs text-[#5E3122]/75">
        <span>
          Showing <strong className="text-[#1D4533] font-semibold">{filteredProducts.length}</strong> creations
        </span>
        <span className="hidden sm:inline">Handcrafted in Pakistan · Export Quality</span>
      </div>

      {/* Render Based on View Mode */}
      {filteredProducts.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          /* Editorial Large Picture Showcase Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-white border border-[#F9D2BA] hover:border-[#1D4533] transition-all cursor-pointer overflow-hidden shadow-sm flex flex-col"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F7EAE0]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="text-white space-y-1 w-full">
                      <p className="text-xs uppercase tracking-widest text-[#F9D2BA]">{product.collection}</p>
                      <h4 className="font-serif text-2xl font-light">{product.name}</h4>
                      <p className="text-xs text-stone-200 line-clamp-2">{product.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[#5E3122]">
                        <span>{product.category}</span>
                        <span className="mx-1.5">·</span>
                        <span>{product.fabric.split('&')[0]}</span>
                      </div>
                      <h3 className="font-serif text-xl font-medium text-[#1D4533] mt-1 group-hover:text-[#5E3122] transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    <span className="font-serif text-base text-[#5E3122]" dir="rtl">
                      {product.urduName}
                    </span>
                  </div>

                  <p className="text-xs text-[#5E3122]/80 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-4 border-t border-[#F9D2BA]/40 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-serif font-semibold text-[#1D4533] tabular-nums">
                        {formatPrice(product.basePricePKR)}
                      </span>
                      <span className="text-[11px] text-[#5E3122]/70 block">Unstitched 3-Piece Base</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 'unstitched');
                        }}
                        className="px-4 py-2 bg-[#1D4533] hover:bg-[#153426] text-[#F7EAE0] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#F9D2BA]" />
                        <span>Quick Bag</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="px-3 py-2 bg-[#F7EAE0] border border-[#F9D2BA] text-[#1D4533] hover:bg-white text-xs font-medium cursor-pointer"
                        title="View Full Creation"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )
      ) : (
        <div className="py-20 text-center bg-white border border-[#F9D2BA] p-8">
          <p className="font-serif text-xl text-[#1D4533]">No suits match your criteria</p>
          <p className="text-xs text-[#5E3122]/80 mt-2">
            Try adjusting your fabric or color filters to explore our full summer edit.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-[#1D4533] text-[#F7EAE0] text-xs font-medium uppercase tracking-wider rounded cursor-pointer"
          >
            View All Pieces
          </button>
        </div>
      )}
    </section>
  );
};
