import React from "react";
import Accordion from "./Accordion";

export default function StatisticsDetail({ technicalStatistics }) {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${technicalStatistics.code_technical}Modal`}
      >
        Detalle
      </button>
      <div
        className="modal fade"
        id={`${technicalStatistics.code_technical}Modal`}
        tabIndex="-1"
        aria-labelledby={`${technicalStatistics.code_technical}ModalLabel`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">
                Ordenes de Reparacion {technicalStatistics.code_technical}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Accordion orders={technicalStatistics.orders} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
