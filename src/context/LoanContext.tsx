import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Loan } from '../model/loan/LoanEntity';
import { LoanRepository } from '../database/repository/LoanRepository';

type LoanContextType = {
    loans: Loan[];
    addLoan: (loan: Loan) => Promise<void>;
    updateLoan: (loan: Loan) => Promise<void>;
    removeLoan: (id: number) => Promise<void>;
    setLoans: (loans: Loan[]) => void;
};

const LoanContext = createContext<LoanContextType | undefined>(undefined);

const loanRepo = new LoanRepository();

export const LoanProvider = ({ children }: { children: ReactNode }) => {
    const [loans, setLoans] = useState<Loan[]>([]);

    useEffect(() => {
        async function loadLoans() {
            const allLoans = await loanRepo.findAll();
            setLoans(allLoans);
        }
        loadLoans();
    }, []);

    const addLoan = async (loan: Loan) => {
        const newLoan = await loanRepo.create(loan);
        setLoans((prev) => [...prev, newLoan]);
    };

    const updateLoan = async (updatedLoan: Loan) => {
        const loan = await loanRepo.update(updatedLoan.id!, updatedLoan);
        if (loan) {
            setLoans((prev) =>
                prev.map((l) => (l.id === updatedLoan.id ? updatedLoan : l))
            );
        }
    };

    const removeLoan = async (id: number) => {
        const success = await loanRepo.delete(id);
        if (success) {
            setLoans((prev) => prev.filter((loan) => loan.id !== id));
        }
    };

    return (
        <LoanContext.Provider
            value={{ loans, addLoan, updateLoan, removeLoan, setLoans }}
        >
            {children}
        </LoanContext.Provider>
    );
};

export const useLoanContext = (): LoanContextType => {
    const context = useContext(LoanContext);
    if (!context) {
        throw new Error('useLoanContext deve ser usado dentro de um LoanProvider');
    }
    return context;
};
