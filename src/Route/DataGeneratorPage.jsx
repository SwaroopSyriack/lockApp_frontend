import ActionPanel from "../components/datagen/ActionPanel";
import StatsCards from "../components/datagen/StatsCards";
import DataTable from "../components/datagen/DataTable";
import { useFadeSlide } from "../components/common/useFadeSlide";
import { useState, useEffect, useRef } from "react";
import WizardModal from "../components/datagen/WizardModal";
import ExcelWizardModal from "../components/datagen/ExcelWizardModal"

export default function DataGeneratorPage() {

  const [wizardOpen, setWizardOpen] = useState(false);
  const [ExcelWizard, setExcelWizard] = useState(false);



  const leftAnim = useFadeSlide({ delay: 0 });
  
  const tableAnim = useFadeSlide({ delay: 320 });
  return (
    <div className="pt-16 p-8 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-12 gap-6 mb-8">
        
        <div className="col-span-12 lg:col-span-8" style={leftAnim}>
        <ActionPanel  setWizardOpen ={ setWizardOpen } setExcelWizard={setExcelWizard}/>
        </div>
        <StatsCards /> 
      </div>
      
      {/* TABLE */}
      <div style={tableAnim}>
      <DataTable />
      </div>
      <WizardModal open={wizardOpen} onClose={() => setWizardOpen(false)} />
      <ExcelWizardModal open={ExcelWizard}  onClose={() => setExcelWizard(false)}/>
    </div>
    
  );
}