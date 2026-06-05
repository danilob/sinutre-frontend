import { useEffect, useState } from 'react';
import { LoginPage } from '@/pages/LoginPage';
import { AddMealModal } from '@/components/modal/AddMealModal';
import { SAMPLE_MEAL_ITEMS } from '@/data/mockData';
import { apiFetch, getToken, setToken } from '@/lib/api';

const EMPTY_MACROS = { carbs: 0, proteins: 0, fats: 0, calories: 0 };

// Lê ?token=... do callback do backend, salva no localStorage e limpa a query.
function consumeTokenFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (!token) return null;
  setToken(token);
  window.history.replaceState({}, '', window.location.pathname);
  return token;
}

async function saveMeal() {
  await apiFetch('/meals', {
    method: 'POST',
    body: JSON.stringify({
      type: 'ALMOCO',
      eatTime: new Date().toISOString(),
      description: 'Refeição cadastrada pelo modal',
    }),
  });
}

export default function App() {
  const [token, setLocalToken] = useState<string | null>(
    () => consumeTokenFromUrl() ?? getToken(),
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fromUrl = consumeTokenFromUrl();
    if (fromUrl) setLocalToken(fromUrl);
  }, []);

  if (!token) {
    return <LoginPage />;
  }

  async function handleSave() {
    try {
      await saveMeal();
      setModalOpen(false);
    } catch (err) {
      console.error('Falha ao salvar refeição', err);
      alert('Não foi possível salvar a refeição. Veja o console.');
    }
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
        onSave={handleSave}
      />
    </div>
  );
}
