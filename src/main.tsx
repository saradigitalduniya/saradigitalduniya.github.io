import { createClient } from '@supabase/supabase-js';

// @ts-ignore
let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
// @ts-ignore
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (supabaseUrl.startsWith('sb_publishable_') || !supabaseUrl.includes('.')) {
  try {
    const payloadStr = atob(supabaseAnonKey.split('.')[1]);
    const payload = JSON.parse(payloadStr);
    if (payload.ref) {
      supabaseUrl = `https://${payload.ref}.supabase.co`;
    }
  } catch(e) {}
}

if (supabaseUrl && !supabaseUrl.startsWith('http')) { supabaseUrl = 'https://' + supabaseUrl; }

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const SupabaseBackend = {
  getProducts: async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error(error);
    return (data || []).map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
      originalPrice: p.original_price,
      image: p.image_url || p.image,
      deliveryTime: p.delivery_time,
      // Fallbacks to preserve UI layout/filters if not present in schema
      category: p.category || 'all',
      badge: p.badge || '',
      rating: p.rating || 5.0,
      reviews: p.reviews || 0,
      downloadUrl: p.download_url || p.downloadurl || p.downloadUrl || ''
    }));
  },
  getServices: async () => {
    const { data, error } = await supabase.from('services').select('*');
    if (error) console.error(error);
    return (data || []).map(s => ({
      ...s
    }));
  },
  getCategories: async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) console.error(error);
    return data || [];
  },
  createProduct: async (productData: any) => {
    const pData = {
      title: productData.title,
      category: productData.category,
      badge: productData.badge,
      price: productData.price,
      original_price: productData.originalPrice,
      rating: productData.rating,
      reviews: productData.reviews,
      image: productData.image,
      download_url: productData.downloadUrl,
      description: productData.description
    };
    const { data, error } = await supabase.from('products').insert(pData).select();
    if (error) {
      console.error('Error creating product:', error);
      return null;
    }
    return data?.[0];
  },
  updateProduct: async (id: any, productData: any) => {
    const pData = {
      title: productData.title,
      category: productData.category,
      badge: productData.badge,
      price: productData.price,
      original_price: productData.originalPrice,
      rating: productData.rating,
      reviews: productData.reviews,
      image: productData.image,
      download_url: productData.downloadUrl,
      description: productData.description,
      published: productData.published
    };
    const { data, error } = await supabase.from('products').update(pData).eq('id', id).select();
    if (error) {
      console.error('Error updating product:', error);
      return null;
    }
    return data?.[0];
  },
  deleteProduct: async (id: any) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Error deleting product:', error);
      return false;
    }
    return true;
  },
  createOrder: async (orderData: any, items: any[]) => {
    const { data: order, error: orderError } = await supabase.from('orders').insert(orderData).select().single();
    if (orderError) {
      console.error(orderError);
      return { error: orderError };
    }
    
    if (items && items.length) {
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity || item.qty || 1,
        price: item.price
      }));
      await supabase.from('order_items').insert(orderItems);
    }
    return { data: order };
  },
  getUserOrders: async (userId: string) => {
    const { data, error } = await supabase.from('orders').select('*, order_items(*, product:products(*))').eq('user_id', userId);
    if (error) {
      console.error(error);
      return [];
    }
    const formattedPurchases: any[] = [];
    data.forEach(order => {
       order.order_items.forEach((item: any) => {
           formattedPurchases.push({
              orderId: 'SDD-' + order.id,
              date: order.created_at ? order.created_at.split('T')[0] : '',
              itemTitle: item.product?.title || 'Unknown Product',
              price: item.price,
              downloadUrl: item.product?.download_url || item.product?.downloadUrl || '',
              status: order.status,
              utr: order.payment_intent || ''
           });
       });
    });
    return formattedPurchases.sort((a,b) => b.orderId.localeCompare(a.orderId));
  },
  getAllOrders: async () => {
    const { data, error } = await supabase.from('orders').select('*, order_items(*, product:products(*)), profile:profiles(*)');
    if (error) {
      console.error(error);
      return [];
    }
    return data;
  },
  createMessage: async (msgData: any) => {
    const { data, error } = await supabase.from('messages').insert(msgData);
    if (error) console.error(error);
    return { data, error };
  },
  signUp: async (email: string, password: string, metadata: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata }
    });
    return { data, error };
  },
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    return { ...user, profile };
  },
  onAuthStateChange: (cb: any) => {
    supabase.auth.onAuthStateChange((event, session) => cb(session));
  },
  updateAuthUser: async (attributes: any) => {
    const { data, error } = await supabase.auth.updateUser(attributes);
    if (error) { console.error('Error updating auth user:', error); return { error }; }
    return { data };
  },
  updateProfile: async (userId: string, profileData: any) => {
    const { data, error } = await supabase.from('profiles').update(profileData).eq('id', userId).select().single();
    if (error) { console.error('Error updating profile:', error); return { error }; }
    return { data };
  },
  getUsers: async () => {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) console.error(error);
    return data || [];
  }
};

(window as any).SupabaseBackend = SupabaseBackend;
window.dispatchEvent(new Event('SupabaseBackendReady'));
