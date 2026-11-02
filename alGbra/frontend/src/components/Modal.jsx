import React from "react";
import { AlertTriangle, Lock, CheckCircle2 } from "lucide-react";
import "../styles/global.css";

export function Modal({ isOpen, title, description, type = "warning", confirmText, cancelText, onConfirm, onCancel }) {
    if (!isOpen) return null;

    const renderIcon = () => {
        switch (type) {
            case "auth":
                return <Lock size={48} color="var(--color-primary, #6c5ce7)" />;
            case "danger":
                return <AlertTriangle size={48} color="#ff4b4b" />;
            case "success":
                return <CheckCircle2 size={48} color="#2ef8a0" />;
            default:
                return <AlertTriangle size={48} color="#ffc800" />;
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content fade-in">
                <div className="modal-header-icon">{renderIcon()}</div>
                <h2 className="modal-title">{title}</h2>
                <div className="modal-description">{description}</div>
                <div className="modal-actions">
                    {cancelText && (
                        <button className="btn-modal-cancel" onClick={onCancel}>
                            {cancelText}
                        </button>
                    )}
                    {confirmText && (
                        <button className={`btn-modal-confirm btn-modal-${type}`} onClick={onConfirm}>
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}