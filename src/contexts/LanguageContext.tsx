
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotifications } from './NotificationsContext';

interface Translations {
  [key: string]: {
    [language: string]: string;
  };
}

const translations: Translations = {
  // Header and Navigation
  'nav.home': {
    en: 'Home',
    es: 'Inicio',
    fr: 'Accueil',
    de: 'Startseite',
    it: 'Casa',
    pt: 'Início',
    zh: '首页',
    ja: 'ホーム'
  },
  'nav.products': {
    en: 'Products',
    es: 'Productos',
    fr: 'Produits',
    de: 'Produkte',
    it: 'Prodotti',
    pt: 'Produtos',
    zh: '产品',
    ja: '製品'
  },
  'nav.collections': {
    en: 'Collections',
    es: 'Colecciones',
    fr: 'Collections',
    de: 'Kollektionen',
    it: 'Collezioni',
    pt: 'Coleções',
    zh: '系列',
    ja: 'コレクション'
  },
  'nav.orders': {
    en: 'Orders',
    es: 'Pedidos',
    fr: 'Commandes',
    de: 'Bestellungen',
    it: 'Ordini',
    pt: 'Pedidos',
    zh: '订单',
    ja: '注文'
  },
  'nav.tracking': {
    en: 'Live Tracking',
    es: 'Seguimiento en Vivo',
    fr: 'Suivi en Direct',
    de: 'Live-Verfolgung',
    it: 'Tracciamento Live',
    pt: 'Rastreamento ao Vivo',
    zh: '实时跟踪',
    ja: 'ライブトラッキング'
  },
  // Live Map Page
  'livemap.title': {
    en: 'Live Order Tracking',
    es: 'Seguimiento de Pedidos en Vivo',
    fr: 'Suivi de Commande en Direct',
    de: 'Live-Bestellverfolgung',
    it: 'Tracciamento Ordini Live',
    pt: 'Rastreamento de Pedidos ao Vivo',
    zh: '实时订单跟踪',
    ja: 'ライブ注文追跡'
  },
  'livemap.track.title': {
    en: 'Track Your Order',
    es: 'Rastrea tu Pedido',
    fr: 'Suivez votre Commande',
    de: 'Verfolgen Sie Ihre Bestellung',
    it: 'Traccia il tuo Ordine',
    pt: 'Rastreie seu Pedido',
    zh: '跟踪您的订单',
    ja: '注文を追跡'
  },
  'livemap.input.placeholder': {
    en: 'Enter your order number (e.g., ORD-123456)',
    es: 'Ingresa tu número de pedido (ej., ORD-123456)',
    fr: 'Entrez votre numéro de commande (ex. ORD-123456)',
    de: 'Geben Sie Ihre Bestellnummer ein (z.B. ORD-123456)',
    it: 'Inserisci il numero del tuo ordine (es. ORD-123456)',
    pt: 'Digite o número do seu pedido (ex. ORD-123456)',
    zh: '输入您的订单号（例如：ORD-123456）',
    ja: '注文番号を入力してください（例：ORD-123456）'
  },
  'livemap.track.button': {
    en: 'Track Order',
    es: 'Rastrear Pedido',
    fr: 'Suivre la Commande',
    de: 'Bestellung Verfolgen',
    it: 'Traccia Ordine',
    pt: 'Rastrear Pedido',
    zh: '跟踪订单',
    ja: '注文を追跡'
  },
  'livemap.error.notfound': {
    en: 'Order number not found. Please check your order number and try again.',
    es: 'Número de pedido no encontrado. Verifica tu número de pedido e inténtalo de nuevo.',
    fr: 'Numéro de commande introuvable. Vérifiez votre numéro de commande et réessayez.',
    de: 'Bestellnummer nicht gefunden. Bitte überprüfen Sie Ihre Bestellnummer und versuchen Sie es erneut.',
    it: 'Numero ordine non trovato. Controlla il numero del tuo ordine e riprova.',
    pt: 'Número do pedido não encontrado. Verifique o número do seu pedido e tente novamente.',
    zh: '未找到订单号。请检查您的订单号并重试。',
    ja: '注文番号が見つかりません。注文番号を確認して再試行してください。'
  },
  'livemap.recent.orders': {
    en: 'Your recent orders:',
    es: 'Tus pedidos recientes:',
    fr: 'Vos commandes récentes:',
    de: 'Ihre letzten Bestellungen:',
    it: 'I tuoi ordini recenti:',
    pt: 'Seus pedidos recentes:',
    zh: '您最近的订单：',
    ja: '最近の注文：'
  },
  // Order Details
  'order.details': {
    en: 'Order Details',
    es: 'Detalles del Pedido',
    fr: 'Détails de la Commande',
    de: 'Bestelldetails',
    it: 'Dettagli Ordine',
    pt: 'Detalhes do Pedido',
    zh: '订单详情',
    ja: '注文詳細'
  },
  'order.status': {
    en: 'Status',
    es: 'Estado',
    fr: 'Statut',
    de: 'Status',
    it: 'Stato',
    pt: 'Status',
    zh: '状态',
    ja: 'ステータス'
  },
  'order.tracking': {
    en: 'Tracking #',
    es: 'Seguimiento #',
    fr: 'Suivi #',
    de: 'Verfolgung #',
    it: 'Tracciamento #',
    pt: 'Rastreamento #',
    zh: '跟踪号',
    ja: '追跡番号'
  },
  'order.date': {
    en: 'Order Date',
    es: 'Fecha del Pedido',
    fr: 'Date de Commande',
    de: 'Bestelldatum',
    it: 'Data Ordine',
    pt: 'Data do Pedido',
    zh: '订单日期',
    ja: '注文日'
  },
  'order.carrier': {
    en: 'Carrier',
    es: 'Transportista',
    fr: 'Transporteur',
    de: 'Spediteur',
    it: 'Corriere',
    pt: 'Transportadora',
    zh: '承运商',
    ja: '運送業者'
  },
  'order.items': {
    en: 'Items',
    es: 'Artículos',
    fr: 'Articles',
    de: 'Artikel',
    it: 'Articoli',
    pt: 'Itens',
    zh: '商品',
    ja: 'アイテム'
  },
  'order.total': {
    en: 'Total',
    es: 'Total',
    fr: 'Total',
    de: 'Gesamt',
    it: 'Totale',
    pt: 'Total',
    zh: '总计',
    ja: '合計'
  },
  // Order Status Values
  'status.pending': {
    en: 'Pending',
    es: 'Pendiente',
    fr: 'En Attente',
    de: 'Ausstehend',
    it: 'In Attesa',
    pt: 'Pendente',
    zh: '待处理',
    ja: '保留中'
  },
  'status.processing': {
    en: 'Processing',
    es: 'Procesando',
    fr: 'En Cours',
    de: 'Bearbeitung',
    it: 'In Elaborazione',
    pt: 'Processando',
    zh: '处理中',
    ja: '処理中'
  },
  'status.shipped': {
    en: 'Shipped',
    es: 'Enviado',
    fr: 'Expédié',
    de: 'Versandt',
    it: 'Spedito',
    pt: 'Enviado',
    zh: '已发货',
    ja: '発送済み'
  },
  'status.delivered': {
    en: 'Delivered',
    es: 'Entregado',
    fr: 'Livré',
    de: 'Geliefert',
    it: 'Consegnato',
    pt: 'Entregue',
    zh: '已送达',
    ja: '配達済み'
  },
  // Notifications
  'notification.order.location.updated': {
    en: 'Order location updated',
    es: 'Ubicación del pedido actualizada',
    fr: 'Localisation de la commande mise à jour',
    de: 'Bestellstandort aktualisiert',
    it: 'Posizione ordine aggiornata',
    pt: 'Localização do pedido atualizada',
    zh: '订单位置已更新',
    ja: '注文場所が更新されました'
  },
  'notification.order.status.changed': {
    en: 'Order status changed',
    es: 'Estado del pedido cambiado',
    fr: 'Statut de commande modifié',
    de: 'Bestellstatus geändert',
    it: 'Stato ordine modificato',
    pt: 'Status do pedido alterado',
    zh: '订单状态已更改',
    ja: '注文ステータスが変更されました'
  }
};

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { addNotification } = useNotifications();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selected-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('selected-language', language);
    
    addNotification({
      title: 'Language Changed',
      message: `Language changed to ${getLanguageName(language)}`,
      type: 'success'
    });
  };

  const t = (key: string): string => {
    return translations[key]?.[currentLanguage] || translations[key]?.['en'] || key;
  };

  const getLanguageName = (code: string): string => {
    const names: Record<string, string> = {
      en: 'English',
      es: 'Español',
      fr: 'Français',
      de: 'Deutsch',
      it: 'Italiano',
      pt: 'Português',
      zh: '中文',
      ja: '日本語'
    };
    return names[code] || code;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
