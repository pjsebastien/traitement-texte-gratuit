"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Save,
  LogIn,
  Link as LinkIcon,
  ExternalLink,
  Check,
  AlertCircle,
  FileText,
  ArrowRight,
} from "lucide-react";

interface AffiliateEntry {
  affiliateUrl: string;
  label: string;
  active: boolean;
}

interface ArticleLinkInfo {
  url: string;
  label: string;
  articles: string[];
}

type LinkMap = Record<string, AffiliateEntry>;

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [links, setLinks] = useState<LinkMap>({});
  const [articleLinks, setArticleLinks] = useState<ArticleLinkInfo[]>([]);
  const [newCleanUrl, setNewCleanUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"configured" | "detected">(
    "detected"
  );

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${password}`,
  };

  async function login() {
    try {
      const res = await fetch("/api/affiliate", { headers });
      if (res.ok) {
        const data = await res.json();
        setLinks(data.links || {});
        setArticleLinks(data.articleLinks || []);
        setAuthenticated(true);
      } else {
        setMessage({ type: "error", text: "Mot de passe incorrect" });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur de connexion" });
    }
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/affiliate", {
        method: "POST",
        headers,
        body: JSON.stringify(links),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Liens sauvegardés !" });
      } else {
        setMessage({ type: "error", text: "Erreur de sauvegarde" });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur réseau" });
    }
    setSaving(false);
    setTimeout(() => setMessage(null), 3000);
  }

  function addLink() {
    if (!newCleanUrl) return;
    setLinks({
      ...links,
      [newCleanUrl]: { affiliateUrl: "", label: "", active: true },
    });
    setNewCleanUrl("");
  }

  function removeLink(url: string) {
    const updated = { ...links };
    delete updated[url];
    setLinks(updated);
  }

  function updateLink(
    url: string,
    field: keyof AffiliateEntry,
    value: string | boolean
  ) {
    setLinks({
      ...links,
      [url]: { ...links[url], [field]: value },
    });
  }

  function importLink(url: string, label: string) {
    if (links[url]) return;
    setLinks({
      ...links,
      [url]: { affiliateUrl: "", label, active: true },
    });
    setMessage({
      type: "success",
      text: `"${label || url}" ajouté aux liens configurés`,
    });
    setTimeout(() => setMessage(null), 3000);
  }

  const unconfiguredLinks = articleLinks.filter((al) => !links[al.url]);
  const configuredArticleLinks = articleLinks.filter((al) => links[al.url]);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <LinkIcon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestion des liens affiliés
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Connectez-vous pour gérer vos liens
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Mot de passe admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <button
              onClick={login}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Se connecter
            </button>
          </div>

          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm flex items-center gap-2 ${
                message.type === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {message.text}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Liens affiliés
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {articleLinks.length} lien(s) dans les articles
              {unconfiguredLinks.length > 0 && (
                <span className="text-amber-600 font-medium">
                  {" "}
                  ({unconfiguredLinks.length} sans URL affiliée)
                </span>
              )}
            </p>
          </div>
          <button
            onClick={save}
            disabled={saving}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Sauvegarder
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-3 rounded-lg text-sm flex items-center gap-2 ${
              message.type === "error"
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {message.type === "success" ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("detected")}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === "detected"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FileText className="w-4 h-4" />
            Liens dans les articles ({articleLinks.length})
          </button>
          <button
            onClick={() => setActiveTab("configured")}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === "configured"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            Liens configurés ({Object.keys(links).length})
          </button>
        </div>

        {/* Tab: Detected links from articles */}
        {activeTab === "detected" && (
          <div className="space-y-3">
            {unconfiguredLinks.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-amber-800 font-medium">
                  {unconfiguredLinks.length} lien(s) sans URL affiliée
                  configurée
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  Cliquez sur &quot;Configurer&quot; pour ajouter l&apos;URL
                  affiliée
                </p>
              </div>
            )}

            {articleLinks.map((al) => {
              const isConfigured = !!links[al.url];
              const entry = links[al.url];
              return (
                <div
                  key={al.url}
                  className={`rounded-xl border p-4 ${
                    isConfigured
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {isConfigured ? (
                          <Check className="w-4 h-4 text-green-600 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                        )}
                        <span className="text-sm font-semibold text-gray-900">
                          {al.label || al.url}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-mono truncate pl-6">
                        {al.url}
                      </p>
                      {isConfigured && entry?.affiliateUrl && (
                        <p className="text-xs text-green-700 font-mono truncate pl-6 mt-1">
                          <ArrowRight className="w-3 h-3 inline mr-1" />
                          {entry.affiliateUrl}
                        </p>
                      )}
                      <div className="flex gap-1.5 mt-2 pl-6">
                        {al.articles.map((slug) => (
                          <span
                            key={slug}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                          >
                            {slug}
                          </span>
                        ))}
                      </div>
                    </div>
                    {!isConfigured && (
                      <button
                        onClick={() => importLink(al.url, al.label)}
                        className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                      >
                        Configurer
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {articleLinks.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>Aucun lien trouvé dans les articles</p>
              </div>
            )}
          </div>
        )}

        {/* Tab: Configured links */}
        {activeTab === "configured" && (
          <>
            {/* Add new link */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex gap-3">
              <input
                type="url"
                placeholder="URL propre (ex: https://www.zoho.com/writer)"
                value={newCleanUrl}
                onChange={(e) => setNewCleanUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addLink()}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
              <button
                onClick={addLink}
                className="px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
            </div>

            {/* Links list */}
            <div className="space-y-3">
              {Object.entries(links).map(([cleanUrl, entry]) => {
                const articleInfo = articleLinks.find(
                  (al) => al.url === cleanUrl
                );
                return (
                  <div
                    key={cleanUrl}
                    className="bg-white rounded-xl border border-gray-200 p-5"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <ExternalLink className="w-4 h-4 shrink-0" />
                          <span className="truncate font-mono">{cleanUrl}</span>
                        </div>
                        {articleInfo && (
                          <div className="flex gap-1.5 mt-1.5 pl-6">
                            {articleInfo.articles.map((slug) => (
                              <span
                                key={slug}
                                className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
                              >
                                {slug}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={entry.active}
                            onChange={(e) =>
                              updateLink(cleanUrl, "active", e.target.checked)
                            }
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          Actif
                        </label>
                        <button
                          onClick={() => removeLink(cleanUrl)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Label (ex: Zoho Writer)"
                        value={entry.label}
                        onChange={(e) =>
                          updateLink(cleanUrl, "label", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <input
                        type="url"
                        placeholder="URL affiliée complète"
                        value={entry.affiliateUrl}
                        onChange={(e) =>
                          updateLink(cleanUrl, "affiliateUrl", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                );
              })}

              {Object.keys(links).length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <LinkIcon className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p>Aucun lien affilié configuré</p>
                  <p className="text-sm mt-1">
                    Allez dans &quot;Liens dans les articles&quot; pour
                    configurer les liens détectés
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
