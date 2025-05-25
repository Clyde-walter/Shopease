
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "@/contexts/StoreContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home } from "@/pages/Home";
import { Products } from "@/pages/Products";
import { Collections } from "@/pages/Collections";
import { Checkout } from "@/pages/Checkout";
import { Orders } from "@/pages/Orders";
import { Admin } from "@/pages/Admin";
import { Cart } from "@/pages/Cart";
import { Profile } from "@/pages/Profile";
import { Wishlist } from "@/pages/Wishlist";
import { ProfileSettings } from "@/pages/ProfileSettings";
import { LiveMap } from "@/pages/LiveMap";
import { ManageAddresses } from "@/pages/ManageAddresses";
import { PaymentMethods } from "@/pages/PaymentMethods";
import { EditInformation } from "@/pages/EditInformation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <StoreProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:orderId" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/settings" element={<ProfileSettings />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/live-map" element={<LiveMap />} />
                <Route path="/manage-addresses" element={<ManageAddresses />} />
                <Route path="/payment-methods" element={<PaymentMethods />} />
                <Route path="/edit-information" element={<EditInformation />} />
                <Route path="/admin" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </StoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
