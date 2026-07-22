import { Routes, Route } from 'react-router-dom'
import Navbar          from './components/Navbar'
import Home            from './components/Home'
import Footer          from './components/Footer'
import FloatingActions from './components/FloatingActions'
import PageLoader      from './components/PageLoader'
import AdminModal from './components/AdminModal'

function MainLayout() {
  return (
    <>
      {/* Cinematic page-load overlay */}
      <PageLoader />

      {/* Custom luxury cursor (desktop only) */}
      <CustomCursor />

      {/* Sticky glass navigation */}
      <Navbar />

      {/* All page sections */}
      <main>
        <Home />
      </main>

      {/* Dark editorial footer */}
      <Footer />

      {/* WhatsApp float + mobile sticky CTA */}
      <FloatingActions />

      {/* Admin Image Manager Modal */}
      <AdminModal />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      {/* Catch-all: redirect to home */}
      <Route path="*" element={<MainLayout />} />
    </Routes>
  )
}
