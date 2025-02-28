import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const HealthcareDatabases = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'category', direction: 'asc' });

  useEffect(() => {
    const loadData = async () => {
      const databases = [
        // 1. EHR and Clinical Data
        {
          category: "EHR and Clinical Data",
          name: "MIMIC",
          description: "De-identified health data from ICU patients at Beth Israel Deaconess Medical Center",
          dataTypes: "Vital signs, labs, medications, procedures, demographics, clinical notes",
          access: "Free but requires credentialing",
          website: "https://mimic.physionet.org/"
        },
        {
          category: "EHR and Clinical Data",
          name: "eICU Collaborative Research Database",
          description: "Multicenter ICU database from 200+ U.S. hospitals",
          dataTypes: "De-identified clinical data (vitals, labs, treatments, severity scores)",
          access: "Free with data use agreement and training",
          website: "https://eicu-crd.mit.edu/"
        },
        {
          category: "EHR and Clinical Data",
          name: "N3C",
          description: "Centralized clinical data repository for COVID-19 research in the U.S.",
          dataTypes: "EHR data (demographics, vitals, diagnoses, procedures, lab results)",
          access: "Researchers can apply via N3C Data Enclave",
          website: "https://covid.cd2h.org/"
        },
        {
          category: "EHR and Clinical Data",
          name: "National Database for Autism Research (NDAR)",
          description: "Repository of data related to autism spectrum disorders",
          dataTypes: "Clinical assessments, imaging, some EHR extracts, genomic data",
          access: "Requires data use certification; de-identified",
          website: "https://ndar.nih.gov/"
        },

        // 2. Genomic Databases
        {
          category: "Genomic Databases",
          name: "The Cancer Genome Atlas (TCGA)",
          description: "Large-scale cancer genomics program with 20,000+ cancer/normal samples",
          dataTypes: "Genomic sequences, gene expression, DNA methylation, clinical data",
          access: "Open-access (aggregate), dbGaP authorization for individual-level data",
          website: "https://portal.gdc.cancer.gov/"
        },
        {
          category: "Genomic Databases",
          name: "dbGaP",
          description: "NIH repository for human genotype and phenotype data",
          dataTypes: "Raw genomic data (BAM/VCF), phenotypic and clinical variables",
          access: "Varies by study; many require Controlled Access via dbGaP",
          website: "https://www.ncbi.nlm.nih.gov/gap"
        },
        {
          category: "Genomic Databases",
          name: "1000 Genomes Project",
          description: "Large catalog of human genetic variation",
          dataTypes: "Whole-genome/exome sequences, variant calls, allele frequencies",
          access: "Publicly available",
          website: "https://www.internationalgenome.org/"
        },
        {
          category: "Genomic Databases",
          name: "UK Biobank",
          description: "Prospective study with ~500,000 participants; deep genetic & phenotypic data",
          dataTypes: "Genotype data, imaging, biomarkers, lifestyle factors, linked EHR data",
          access: "Requires application & approval; fees may apply",
          website: "https://www.ukbiobank.ac.uk/"
        },

        // 3. Claims and Administrative Data
        {
          category: "Claims and Administrative",
          name: "Medicare and Medicaid Claims (CMS)",
          description: "Administrative claims data for Medicare beneficiaries",
          dataTypes: "Inpatient, outpatient, skilled nursing, prescription drug claims",
          access: "Public Use Files available; Research Identifiable Files require DUA",
          website: "https://resdac.org/"
        },
        {
          category: "Claims and Administrative",
          name: "HCUP",
          description: "Collection of healthcare databases sponsored by AHRQ",
          dataTypes: "Hospital discharge records, inpatient stays, ED visits, procedures, costs",
          access: "Available for purchase; de-identified",
          website: "https://www.hcup-us.ahrq.gov/"
        },

        // 4. National Health Surveys
        {
          category: "National Health Surveys",
          name: "NAMCS",
          description: "Data on use & provision of ambulatory care in U.S. physician offices",
          dataTypes: "Visit-level data (demographics, diagnoses, services, medications)",
          access: "Public-use files; restricted data via Research Data Center",
          website: "https://www.cdc.gov/nchs/ahcd/index.htm"
        },
        {
          category: "National Health Surveys",
          name: "NHAMCS",
          description: "Data on use & provision of ambulatory care in U.S. hospital outpatient & EDs",
          dataTypes: "Visit-level data (demographics, diagnoses, services, medications)",
          access: "Public-use files; restricted data via Research Data Center",
          website: "https://www.cdc.gov/nchs/ahcd/index.htm"
        },
        {
          category: "National Health Surveys",
          name: "NHANES",
          description: "Ongoing survey assessing health & nutrition of U.S. adults & children",
          dataTypes: "Demographics, lab results, exams, questionnaires, dietary info",
          access: "Mostly publicly available; linked data restricted",
          website: "https://www.cdc.gov/nchs/nhanes/index.htm"
        },
        {
          category: "National Health Surveys",
          name: "BRFSS",
          description: "Large-scale telephone survey on health-related risk behaviors",
          dataTypes: "Self-reported health status, preventive practices, risk behaviors",
          access: "Publicly available datasets",
          website: "https://www.cdc.gov/brfss"
        },

        // 5. Disease-Specific / Specialized Databases
        {
          category: "Disease-Specific / Specialized",
          name: "SEER",
          description: "Authoritative source on U.S. cancer incidence & survival (NCI)",
          dataTypes: "Demographics, tumor site, morphology, stage, survival data",
          access: "Public-use data files; restricted linking with Medicare",
          website: "https://seer.cancer.gov/"
        },
        {
          category: "Disease-Specific / Specialized",
          name: "National Trauma Data Bank (NTDB)",
          description: "Largest U.S. trauma registry data by the American College of Surgeons",
          dataTypes: "Injury details, procedures, outcomes, demographics for trauma patients",
          access: "De-identified datasets available for purchase",
          website: "https://www.facs.org/quality-programs/trauma/tns/ntdb/"
        },
        {
          category: "Disease-Specific / Specialized",
          name: "PhysioNet",
          description: "Resource for complex physiologic signals & time-series data",
          dataTypes: "ECG, EEG waveforms, other biomedical signals, clinical annotations",
          access: "Many datasets open after account creation; some require credentialing",
          website: "https://physionet.org/"
        },
        {
          category: "Disease-Specific / Specialized",
          name: "NIH Image and Signal Datasets",
          description: "Various NIH-provided image datasets (e.g., Chest X-ray, Cancer Imaging Archive)",
          dataTypes: "De-identified medical images (X-ray, CT, MRI), associated metadata",
          access: "Open or require registration; typically de-identified",
          website: "https://www.cancerimagingarchive.net/"
        },

        // 6. Other Resources / Portals
        {
          category: "Other Resources / Portals",
          name: "Kaggle",
          description: "Online community offering open and semi-open datasets, including healthcare",
          dataTypes: "Varies: images, tabular data, time-series, etc.",
          access: "Some data open; others require competition or license acceptance",
          website: "https://www.kaggle.com/datasets"
        },
        {
          category: "Other Resources / Portals",
          name: "data.gov",
          description: "Centralized portal for U.S. government open data",
          dataTypes: "Varied, including health data from CDC, CMS, FDA, NIH",
          access: "Publicly available",
          website: "https://www.data.gov/"
        },
        {
          category: "Other Resources / Portals",
          name: "Global Health Observatory (GHO)",
          description: "WHO portal with global health indicators, demographics, disease prevalence",
          dataTypes: "Aggregated statistics, not individual-level EHR data",
          access: "Open access",
          website: "https://www.who.int/data/gho"
        },
        {
          category: "Other Resources / Portals",
          name: "European Open Science Cloud (EOSC)",
          description: "Platform aggregating research data from European projects",
          dataTypes: "Varied, including healthcare & genomic data",
          access: "Registration or EU research affiliation may be required",
          website: "https://eosc-portal.eu/"
        }
      ];
      setData(databases);
    };

    loadData();
  }, []);

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Healthcare Databases Overview</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th 
                className="p-2 border cursor-pointer hover:bg-gray-200"
                onClick={() => sortData('category')}
              >
                Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="p-2 border cursor-pointer hover:bg-gray-200"
                onClick={() => sortData('name')}
              >
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Data Types</th>
              <th className="p-2 border">Access</th>
              <th className="p-2 border">Website</th>
            </tr>
          </thead>
          <tbody>
            {data.map((db, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border">{db.category}</td>
                <td className="p-2 border font-medium">{db.name}</td>
                <td className="p-2 border">{db.description}</td>
                <td className="p-2 border">{db.dataTypes}</td>
                <td className="p-2 border">{db.access}</td>
                <td className="p-2 border text-blue-600">
                  <a href={db.website} target="_blank" rel="noopener noreferrer">
                    {db.website}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HealthcareDatabases;
