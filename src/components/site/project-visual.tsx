"use client";

import type { ProjectVisualKind } from "@/lib/content";
import { useI18n } from "@/components/language-provider";

type Props = {
  kind: ProjectVisualKind;
  title: string;
};

export function ProjectVisual({ kind, title }: Props) {
  const { c } = useI18n();
  const ui = c.ui;

  return (
    <div
      className={`project-visual visual-${kind}`}
      role="img"
      aria-label={`${ui.visualAria} — ${title}`}
    >
      <div className="visual-grid" aria-hidden="true" />
      <div className="visual-bar">
        <span className="mono">{ui.visualSystem}</span>
        <span className="visual-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>

      {kind === "incident" && (
        <div className="visual-stage incident-stage" aria-hidden="true">
          <div className="incident-sidebar">
            <span className="mini-logo">GP</span>
            {[0, 1, 2, 3].map((item) => (
              <span className="mini-nav-line" key={item} />
            ))}
          </div>
          <div className="incident-main">
            <div className="incident-kpis">
              <div>
                <span className="mini-label">{ui.visualReported}</span>
                <strong>—</strong>
              </div>
              <div>
                <span className="mini-label">{ui.visualInProgress}</span>
                <strong>—</strong>
              </div>
              <div>
                <span className="mini-label">{ui.visualResolved}</span>
                <strong>—</strong>
              </div>
            </div>
            <div className="incident-map">
              <span className="map-road map-road-a" />
              <span className="map-road map-road-b" />
              <span className="map-road map-road-c" />
              <span className="map-pin pin-a" />
              <span className="map-pin pin-b" />
              <span className="map-pin pin-c" />
              <span className="map-tooltip">{ui.visualHighPriority}</span>
            </div>
            <div className="incident-timeline">
              <span className="timeline-dot is-active" />
              <span className="timeline-line" />
              <span className="timeline-dot" />
              <span className="timeline-line" />
              <span className="timeline-dot" />
              <span className="timeline-label">{ui.visualTimeline}</span>
            </div>
          </div>
        </div>
      )}

      {kind === "erp" && (
        <div className="visual-stage erp-stage" aria-hidden="true">
          <div className="erp-sidebar">
            <span className="mini-logo">BE</span>
            <span className="sidebar-title">ERP</span>
            {[
              ui.visualStock,
              ui.visualSales,
              ui.visualClients,
              ui.visualTreasury,
            ].map((item, index) => (
              <span
                className={`sidebar-row ${index === 0 ? "is-active" : ""}`}
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="erp-main">
            <div className="erp-head">
              <span className="mini-label">{ui.visualDashboard}</span>
              <span className="mini-chip">{ui.visualYear}</span>
            </div>
            <div className="erp-chart">
              {[38, 62, 44, 78, 56, 88, 70, 94].map((height, index) => (
                <span
                  className="chart-bar"
                  style={{ height: `${height}%` }}
                  key={index}
                />
              ))}
            </div>
            <div className="erp-rows">
              {[
                ["Ciment 50 kg", "···"],
                ["Peinture blanche", "···"],
                ["Vis inox 6×80", "···"],
              ].map(([name, value]) => (
                <div className="erp-row" key={name}>
                  <span>{name}</span>
                  <span className="mono">{value}</span>
                  <span className="stock-pill">{ui.visualStock}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {kind === "pipeline" && (
        <div className="visual-stage pipeline-stage" aria-hidden="true">
          <div className="pipeline-terminal">
            <span className="terminal-dot" />
            <span className="mono">pipeline / production</span>
          </div>
          <div className="pipeline-mini">
            {["push", "test", "build", "deploy", "observe"].map(
              (step, index) => (
                <div className="pipeline-mini-step" key={step}>
                  <span className={`mini-node ${index === 4 ? "is-final" : ""}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mono">{step}</span>
                  {index < 4 && <span className="mini-connector" />}
                </div>
              ),
            )}
            <span className="pipeline-pulse" />
          </div>
          <div className="pipeline-metrics">
            <div>
              <span className="mini-label">{ui.visualAutoTests}</span>
              <span className="metric-line">
                <i style={{ width: "92%" }} />
              </span>
            </div>
            <div>
              <span className="mini-label">{ui.visualLogs}</span>
              <span className="metric-line">
                <i style={{ width: "78%" }} />
              </span>
            </div>
            <div>
              <span className="mini-label">{ui.visualAlerts}</span>
              <span className="metric-line">
                <i style={{ width: "100%" }} />
              </span>
            </div>
          </div>
        </div>
      )}

      <span className="visual-foot mono" aria-hidden="true">
        {ui.visualConcept} · {kind.toUpperCase()}
      </span>
    </div>
  );
}
