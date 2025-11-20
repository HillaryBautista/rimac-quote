import { Routes, Route } from "react-router-dom";
import { HomePage } from "../../ui/pages/HomePage";
import { PlansPage } from "../../ui/pages/PlansPage";
import { SummaryPage } from "../../ui/pages/SummaryPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/plans" element={<PlansPage />} />
      <Route path="/summary" element={<SummaryPage />} />
    </Routes>
  );
};
