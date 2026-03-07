import { Mail, MessageCircle, Minus, Plus, ShoppingCart as ShoppingCartIcon, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';
import { createSlug } from '../../utils/slugHelper';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const { settings } = useSettings();


    const generateCheckoutMessage = () => {
        let message = "Hello Sjahlendra Handicraft! I would like to order the following items:\n\n";
        cart.forEach((item, index) => {
            message += `${index + 1}. *${item.name}*\n`;
            if (item.code) message += `   Code: ${item.code}\n`;
            message += `   Qty: ${item.quantity || 1}\n\n`;
        });
        message += "Please let me know the availability and shipping costs. Thank you!";
        return message;
    };

    const handleWhatsAppCheckout = () => {
        const whatsappNumber = settings?.whatsapp_number || '';
        if (!whatsappNumber) {
            alert("WhatsApp contact is not configured.");
            return;
        }

        let cleanNumber = whatsappNumber.replace(/[^\d+]/g, '');
        if (cleanNumber.startsWith('0')) {
            cleanNumber = '62' + cleanNumber.substring(1);
        } else if (cleanNumber.startsWith('+')) {
            cleanNumber = cleanNumber.substring(1);
        }

        const message = encodeURIComponent(generateCheckoutMessage());
        window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
    };

    const handleEmailCheckout = () => {
        const email = settings?.email || '';
        if (!email) {
            alert("Email contact is not configured.");
            return;
        }

        const subject = encodeURIComponent("New Order from Sjahlendra Handicraft");
        const body = encodeURIComponent(generateCheckoutMessage());
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page container">
                <div className="empty-cart">
                    <ShoppingCartIcon size={64} />
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/products" className="btn-primary">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <header className="cart-header">
                <h1>Shopping Cart</h1>
                <p>{cart.length} {cart.length === 1 ? 'type of item' : 'types of items'}</p>
            </header>

            <div className="cart-content">
                <div className="cart-items-list">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item-card">
                            <div className="cart-item-image">
                                <img src={item.image_url || 'https://placehold.co/100x100/f0f0f0/999?text=No+Image'} alt={item.name} />
                            </div>
                            <div className="cart-item-info">
                                <Link to={`/product/${createSlug(item.name)}`} className="cart-item-name">
                                    {item.name}
                                </Link>
                                {item.code && <span className="cart-item-code">Code: {item.code}</span>}
                            </div>
                            <div className="cart-item-quantity">
                                <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} className="qty-btn">
                                    <Minus size={14} />
                                </button>
                                <span className="qty-value">{item.quantity || 1}</span>
                                <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} className="qty-btn">
                                    <Plus size={14} />
                                </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="remove-item-btn" title="Remove item">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    
                    <div className="cart-actions-bottom">
                        <button onClick={clearCart} className="btn-clear-cart">Clear Cart</button>
                        <Link to="/products" className="btn-continue-shopping">Continue Shopping</Link>
                    </div>
                </div>

                <div className="cart-summary-sidebar">
                    <div className="summary-card">
                        <p className="shipping-info">Please let us know your location to calculate shipping costs.</p>
                        
                        <div className="checkout-buttons">
                            <button onClick={handleWhatsAppCheckout} className="btn-checkout wa">
                                <MessageCircle size={20} />
                                Checkout via WhatsApp
                            </button>
                            <button onClick={handleEmailCheckout} className="btn-checkout email">
                                <Mail size={20} />
                                Checkout via Email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
