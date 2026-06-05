import { useState } from 'react';
import { LoginPage } from '@/pages/LoginPage';
import { AddMealModal } from '@/components/modal/AddMealModal';
import { SAMPLE_MEAL_ITEMS } from '@/data/mockData';

const EMPTY_MACROS = { carbs: 0, proteins: 0, fats: 0, calories: 0 };

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (!isAuthenticated) {
    return <LoginPage onLoginWithGithub={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={() => setModalOpen(true)}
      >
        Adicionar refeição
      </button>

      <AddMealModal
        open={modalOpen}
        macros={EMPTY_MACROS}
        items={SAMPLE_MEAL_ITEMS}
        onClose={() => setModalOpen(false)}
        onSave={() => setModalOpen(false)}
      />
    </div>
  );
}
