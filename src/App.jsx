import React, { useState, useRef, useEffect } from "react";
import {
  Plus, Type, Image as ImageIcon, Video, FolderPlus, List as ListIcon,
  Phone, Mail, ChevronLeft, ChevronRight, X, Check, Link as LinkIcon,
  Share2, Edit3, MapPin
} from "lucide-react";

/* ---------------------------------- helpers ---------------------------------- */

let __uidCounter = 0;
function uid() {
  __uidCounter += 1;
  return "id_" + Date.now().toString(36) + "_" + __uidCounter;
}

function newCategory(name) {
  return { id: uid(), name, blocks: [], lists: [], subcategories: [] };
}

function findCategoryAtPath(categories, path) {
  let list = categories;
  let cat = null;
  for (const id of path) {
    cat = list.find((c) => c.id === id);
    if (!cat) return null;
    list = cat.subcategories;
  }
  return cat;
}

function updateCategoryAtPath(categories, path, fn) {
  if (path.length === 0) return categories;
  const [head, ...rest] = path;
  return categories.map((cat) => {
    if (cat.id !== head) return cat;
    if (rest.length === 0) return fn(cat);
    return { ...cat, subcategories: updateCategoryAtPath(cat.subcategories, rest, fn) };
  });
}

function getPathNames(categories, path) {
  const names = [];
  let list = categories;
  for (const id of path) {
    const cat = list.find((c) => c.id === id);
    if (!cat) break;
    names.push(cat.name);
    list = cat.subcategories;
  }
  return names;
}

/* ---------------------------------- small ui pieces ---------------------------------- */

function FileChoose({ accept, multiple, onFile, onFiles, label, icon }) {
  const inputRef = useRef(null);
  return (
    <div className="file-choose" onClick={() => inputRef.current && inputRef.current.click()}>
      {icon}
      <span>{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: "none" }}
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length === 0) return;
          if (multiple && onFiles) {
            onFiles(files.map((f) => URL.createObjectURL(f)));
          } else if (onFile) {
            onFile(URL.createObjectURL(files[0]));
          }
          e.target.value = "";
        }}
      />
    </div>
  );
}

function PlusMenu({ onAddText, onAddPic, onAddVideo, onAddCategory, onAddList, showCategory, showList }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [value, setValue] = useState("");

  function reset() {
    setOpen(false);
    setMode(null);
    setValue("");
  }

  return (
    <div className="plus-menu-wrap">
      <button className="plus-btn" onClick={() => setOpen((o) => !o)} aria-label="Add to this page">
        <Plus size={18} />
      </button>
      {open && (
        <div className="plus-dropdown">
          {mode === null && (
            <>
              <button onClick={() => { onAddText(); reset(); }}><Type size={14} /> Add text</button>
              <button onClick={() => { onAddPic(); reset(); }}><ImageIcon size={14} /> Add pic</button>
              <button onClick={() => { onAddVideo(); reset(); }}><Video size={14} /> Add video</button>
              {showCategory && (
                <button onClick={() => setMode("category")}><FolderPlus size={14} /> Add category</button>
              )}
              {showList && (
                <button onClick={() => setMode("list")}><ListIcon size={14} /> Add list (venues/halls)</button>
              )}
            </>
          )}
          {mode === "category" && (
            <div className="inline-form">
              <input
                autoFocus
                placeholder="Category name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && value.trim()) { onAddCategory(value.trim()); reset(); } }}
              />
              <div className="inline-form-actions">
                <button onClick={() => { if (value.trim()) { onAddCategory(value.trim()); reset(); } }}><Check size={14} /></button>
                <button onClick={reset}><X size={14} /></button>
              </div>
            </div>
          )}
          {mode === "list" && (
            <div className="inline-form">
              <input
                autoFocus
                placeholder="List title, e.g. Banquet Halls"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && value.trim()) { onAddList(value.trim()); reset(); } }}
              />
              <div className="inline-form-actions">
                <button onClick={() => { if (value.trim()) { onAddList(value.trim()); reset(); } }}><Check size={14} /></button>
                <button onClick={reset}><X size={14} /></button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BlockRenderer({ block, onUpdate, onRemove, readOnly }) {
  if (block.type === "text") {
    return (
      <div className="block block-text">
        {readOnly ? (
          <p>{block.content || ""}</p>
        ) : (
          <>
            <textarea
              value={block.content}
              onChange={(e) => onUpdate({ ...block, content: e.target.value })}
              placeholder="Type your text here..."
            />
            <button className="remove-btn" onClick={onRemove} aria-label="Remove text block"><X size={12} /></button>
          </>
        )}
      </div>
    );
  }
  if (block.type === "image") {
    return (
      <div className="block block-image">
        {block.content ? (
          <img src={block.content} alt="" />
        ) : (
          !readOnly && (
            <FileChoose accept="image/*" label="Choose file" icon={<ImageIcon size={20} />} onFile={(url) => onUpdate({ ...block, content: url })} />
          )
        )}
        {!readOnly && <button className="remove-btn" onClick={onRemove} aria-label="Remove photo block"><X size={12} /></button>}
      </div>
    );
  }
  if (block.type === "video") {
    return (
      <div className="block block-video">
        {block.content ? (
          <video src={block.content} autoPlay muted loop playsInline />
        ) : (
          !readOnly && (
            <FileChoose accept="video/*" label="Choose file" icon={<Video size={20} />} onFile={(url) => onUpdate({ ...block, content: url })} />
          )
        )}
        {!readOnly && <button className="remove-btn" onClick={onRemove} aria-label="Remove video block"><X size={12} /></button>}
      </div>
    );
  }
  return null;
}

function Breadcrumb({ names, onGoHome, onGoTo }) {
  return (
    <div className="breadcrumb">
      <button onClick={onGoHome}>Home</button>
      {names.map((n, i) => (
        <span key={i} className="crumb-group">
          <span className="crumb-sep">/</span>
          <button onClick={() => onGoTo(i)}>{n}</button>
        </span>
      ))}
    </div>
  );
}

/* ---------------------------------- venue / hall list ---------------------------------- */

function emptyHallForm() {
  return { name: "", priceRange: "", details: "", photos: [], videos: [] };
}

function VenueList({ list, onUpdateList, onRemoveList, onAddHall, onOpenHall, readOnly }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyHallForm());
  const halls = list.halls;

  function submitHall() {
    if (!form.name.trim()) return;
    onAddHall({ id: uid(), ...form });
    setForm(emptyHallForm());
    setAdding(false);
  }

  return (
    <div className="venue-list">
      <div className="venue-list-head">
        {readOnly ? (
          <h3>{list.title}</h3>
        ) : (
          <input className="list-title-input" value={list.title} onChange={(e) => onUpdateList({ ...list, title: e.target.value })} />
        )}
        {!readOnly && (
          <button className="icon-btn-ghost" onClick={onRemoveList} aria-label="Remove this list"><X size={14} /></button>
        )}
      </div>
      <div className="venue-grid">
        {halls.map((hall) => (
          <button key={hall.id} className="venue-card" onClick={() => onOpenHall(hall.id)}>
            <div className="venue-thumb">
              {hall.photos[0] ? <img src={hall.photos[0]} alt="" /> : <ImageIcon size={26} className="thumb-placeholder" />}
            </div>
            <div className="venue-info">
              <span className="venue-name">{hall.name}</span>
              {hall.priceRange && <span className="venue-price">{hall.priceRange}</span>}
            </div>
          </button>
        ))}
        {halls.length === 0 && (
          <div className="empty-note">No venues added yet.</div>
        )}
        {!readOnly && (
          adding ? (
            <div className="venue-card add-form">
              <input placeholder="Venue / hall name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              <input placeholder="Price range, e.g. ₹80,000 - ₹1,50,000" value={form.priceRange} onChange={(e) => setForm((f) => ({ ...f, priceRange: e.target.value }))} />
              <textarea placeholder="Details about this venue..." value={form.details} onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))} />
              <FileChoose accept="image/*" multiple label={`Choose photos (${form.photos.length} added)`} icon={<ImageIcon size={16} />} onFiles={(urls) => setForm((f) => ({ ...f, photos: [...f.photos, ...urls] }))} />
              <FileChoose accept="video/*" multiple label={`Choose videos (${form.videos.length} added)`} icon={<Video size={16} />} onFiles={(urls) => setForm((f) => ({ ...f, videos: [...f.videos, ...urls] }))} />
              <div className="inline-form-actions">
                <button className="btn-small btn-wine" onClick={submitHall}>Add</button>
                <button className="btn-small" onClick={() => { setAdding(false); setForm(emptyHallForm()); }}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className="venue-card add-card" onClick={() => setAdding(true)}>
              <Plus size={22} />
              <span>Add {list.title ? list.title.replace(/s$/i, "") : "venue"}</span>
            </button>
          )
        )}
      </div>
    </div>
  );
}

/* ---------------------------------- pages ---------------------------------- */

function HomePage({ mainBlocks, updateMainBlock, removeMainBlock, categories, goToCategory, footerContact, setFooterContact, published }) {
  return (
    <div className="page home-page">
      <div className="blocks-area home-blocks">
        {mainBlocks.length === 0 && !published && (
          <div className="empty-hint">Use the + next to the menu above to add text, photos, videos or categories to your homepage.</div>
        )}
        {mainBlocks.map((b) => (
          <BlockRenderer key={b.id} block={b} onUpdate={(u) => updateMainBlock(b.id, u)} onRemove={() => removeMainBlock(b.id)} readOnly={published} />
        ))}
      </div>

      {categories.length > 0 && (
        <>
          <div className="section-label">Explore</div>
          <div className="category-grid">
            {categories.map((cat) => (
              <button key={cat.id} className="category-tile large" onClick={() => goToCategory([cat.id])}>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </>
      )}

      <div className="footer-contact">
        <div className="ornament small"><span className="diamond" /></div>
        <div className="footer-row">
          <Phone size={16} />
          {published ? (
            <a href={`tel:${footerContact.phone}`}>{footerContact.phone || "Phone not added"}</a>
          ) : (
            <input placeholder="Contact phone number" value={footerContact.phone} onChange={(e) => setFooterContact((c) => ({ ...c, phone: e.target.value }))} />
          )}
        </div>
        <div className="footer-row">
          <Mail size={16} />
          {published ? (
            <a href={`mailto:${footerContact.email}`}>{footerContact.email || "Email not added"}</a>
          ) : (
            <input placeholder="Contact email (Gmail)" value={footerContact.email} onChange={(e) => setFooterContact((c) => ({ ...c, email: e.target.value }))} />
          )}
        </div>
      </div>
    </div>
  );
}

function AboutPage({ columns, setColumns, published }) {
  const addColumn = () => setColumns((c) => [...c, { id: uid(), photo: null, text: "" }]);
  const updateColumn = (id, updated) => setColumns((c) => c.map((x) => (x.id === id ? updated : x)));
  const removeColumn = (id) => setColumns((c) => c.filter((x) => x.id !== id));

  return (
    <div className="page about-page">
      <h1>About Us</h1>
      <div className="ornament"><span className="diamond" /></div>
      <div className="about-columns">
        {columns.map((col) => (
          <div key={col.id} className="about-column">
            <div className="about-photo">
              {col.photo ? (
                <img src={col.photo} alt="" />
              ) : (
                !published && <FileChoose accept="image/*" label="Choose file" icon={<ImageIcon size={20} />} onFile={(url) => updateColumn(col.id, { ...col, photo: url })} />
              )}
            </div>
            {published ? (
              <p className="about-text">{col.text}</p>
            ) : (
              <textarea className="about-textarea" placeholder="Write something about your story, team or services..." value={col.text} onChange={(e) => updateColumn(col.id, { ...col, text: e.target.value })} />
            )}
            {!published && columns.length > 1 && (
              <button className="remove-btn" onClick={() => removeColumn(col.id)} aria-label="Remove this column"><X size={12} /></button>
            )}
          </div>
        ))}
      </div>
      {!published && (
        <button className="plus-btn standalone" onClick={addColumn} aria-label="Add another column"><Plus size={18} /></button>
      )}
    </div>
  );
}

function ContactPage({ contactInfo, setContactInfo, published }) {
  return (
    <div className="page contact-page">
      <h1>Contact Us</h1>
      <div className="ornament"><span className="diamond" /></div>
      <div className="contact-form">
        <label><Phone size={16} /> Phone number</label>
        {published ? (
          <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone || "Not added"}</a>
        ) : (
          <input placeholder="+91 90000 00000" value={contactInfo.phone} onChange={(e) => setContactInfo((c) => ({ ...c, phone: e.target.value }))} />
        )}
        <label><Mail size={16} /> Email (Gmail)</label>
        {published ? (
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email || "Not added"}</a>
        ) : (
          <input placeholder="you@gmail.com" value={contactInfo.email} onChange={(e) => setContactInfo((c) => ({ ...c, email: e.target.value }))} />
        )}
      </div>
    </div>
  );
}

function CategoryPage({ path, categories, setCategories, goHome, goToCategory, goToHall, published }) {
  const cat = findCategoryAtPath(categories, path);
  if (!cat) return <div className="page">Category not found.</div>;

  const update = (fn) => setCategories((prev) => updateCategoryAtPath(prev, path, fn));
  const addBlock = (type) => update((c) => ({ ...c, blocks: [...c.blocks, { id: uid(), type, content: type === "text" ? "" : null }] }));
  const updateBlock = (id, updated) => update((c) => ({ ...c, blocks: c.blocks.map((b) => (b.id === id ? updated : b)) }));
  const removeBlock = (id) => update((c) => ({ ...c, blocks: c.blocks.filter((b) => b.id !== id) }));
  const addList = (title) => update((c) => ({ ...c, lists: [...c.lists, { id: uid(), title, searchQuery: "", halls: [] }] }));
  const updateList = (listId, updatedList) => update((c) => ({ ...c, lists: c.lists.map((l) => (l.id === listId ? updatedList : l)) }));
  const removeList = (listId) => update((c) => ({ ...c, lists: c.lists.filter((l) => l.id !== listId) }));
  const addHallToList = (listId, hall) => update((c) => ({ ...c, lists: c.lists.map((l) => (l.id === listId ? { ...l, halls: [...l.halls, hall] } : l)) }));
  const addSubcategory = (name) => update((c) => ({ ...c, subcategories: [...c.subcategories, newCategory(name)] }));
  const renameCategory = (name) => update((c) => ({ ...c, name }));

  const breadcrumbNames = getPathNames(categories, path);

  return (
    <div className="page category-page">
      <Breadcrumb names={breadcrumbNames} onGoHome={goHome} onGoTo={(idx) => goToCategory(path.slice(0, idx + 1))} />
      <div className="category-header">
        {published ? (
          <h1>{cat.name}</h1>
        ) : (
          <input className="category-name-input" value={cat.name} onChange={(e) => renameCategory(e.target.value)} />
        )}
        {!published && (
          <PlusMenu
            showCategory
            showList
            onAddText={() => addBlock("text")}
            onAddPic={() => addBlock("image")}
            onAddVideo={() => addBlock("video")}
            onAddCategory={addSubcategory}
            onAddList={addList}
          />
        )}
      </div>

      <div className="blocks-area">
        {cat.blocks.map((b) => (
          <BlockRenderer key={b.id} block={b} onUpdate={(u) => updateBlock(b.id, u)} onRemove={() => removeBlock(b.id)} readOnly={published} />
        ))}
      </div>

      {cat.lists.map((list) => (
        <VenueList
          key={list.id}
          list={list}
          readOnly={published}
          onUpdateList={(u) => updateList(list.id, u)}
          onRemoveList={() => removeList(list.id)}
          onAddHall={(h) => addHallToList(list.id, h)}
          onOpenHall={(hallId) => goToHall(path, list.id, hallId)}
        />
      ))}

      {cat.subcategories.length > 0 && (
        <>
          <div className="section-label">Sub-categories</div>
          <div className="subcategory-grid">
            {cat.subcategories.map((sc) => (
              <button key={sc.id} className="category-tile" onClick={() => goToCategory([...path, sc.id])}>
                <span>{sc.name}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {cat.blocks.length === 0 && cat.lists.length === 0 && cat.subcategories.length === 0 && !published && (
        <div className="empty-hint">This category is empty. Use the + next to “{cat.name}” to add text, photos, a venue list, or more categories.</div>
      )}
    </div>
  );
}

function HallDetailPage({ path, listId, hallId, categories, goBack }) {
  const cat = findCategoryAtPath(categories, path);
  const list = cat && cat.lists.find((l) => l.id === listId);
  const hall = list && list.halls.find((h) => h.id === hallId);
  const media = hall ? [...hall.photos.map((p) => ({ type: "image", src: p })), ...hall.videos.map((v) => ({ type: "video", src: v }))] : [];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (media.length <= 1) return undefined;
    const timer = setTimeout(() => setIdx((i) => (i + 1) % media.length), 4000);
    return () => clearTimeout(timer);
  }, [idx, media.length]);

  if (!hall) {
    return (
      <div className="page hall-detail-page">
        <button className="back-link" onClick={goBack}><ChevronLeft size={16} /> Back</button>
        <p>This listing could not be found.</p>
      </div>
    );
  }

  const current = media[idx];

  return (
    <div className="page hall-detail-page">
      <button className="back-link" onClick={goBack}><ChevronLeft size={16} /> Back to list</button>
      <h1>{hall.name}</h1>
      {hall.priceRange && <div className="price-tag"><MapPin size={13} /> {hall.priceRange}</div>}

      <div className="carousel">
        {media.length > 0 ? (
          <>
            {media.length > 1 && (
              <button className="carousel-nav prev" onClick={() => setIdx((i) => (i - 1 + media.length) % media.length)} aria-label="Previous"><ChevronLeft /></button>
            )}
            {current.type === "image" ? <img src={current.src} alt="" /> : <video src={current.src} autoPlay muted loop playsInline />}
            {media.length > 1 && (
              <button className="carousel-nav next" onClick={() => setIdx((i) => (i + 1) % media.length)} aria-label="Next"><ChevronRight /></button>
            )}
          </>
        ) : (
          <div className="no-media">No photos or videos added yet.</div>
        )}
      </div>

      {media.length > 1 && (
        <div className="carousel-dots">
          {media.map((m, i) => (
            <span key={i} className={"dot" + (i === idx ? " active" : "")} onClick={() => setIdx(i)} />
          ))}
        </div>
      )}

      <div className="hall-details">
        <h3>Details</h3>
        <p>{hall.details || "No details added yet."}</p>
      </div>
    </div>
  );
}

/* ---------------------------------- header ---------------------------------- */

function navClass(view, type) {
  return "nav-btn" + (view.type === type ? " active" : "");
}

function Header({ siteName, setSiteName, tagline, setTagline, view, goHome, goAbout, goContact, published, mainMenuProps }) {
  return (
    <header className="site-header">
      <div className="brand-row">
        {published ? (
          <h1 className="site-name">{siteName}</h1>
        ) : (
          <input className="site-name-input" value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="Your Website Name" />
        )}
      </div>
      <div className="tagline-row">
        {published ? (
          tagline && <p className="site-tagline">{tagline}</p>
        ) : (
          <input className="site-tagline-input" value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Add a one-line tagline, e.g. Timeless weddings, thoughtfully planned" />
        )}
      </div>
      <div className="ornament"><span className="diamond" /></div>
      <nav className="main-nav">
        <button className={navClass(view, "home")} onClick={goHome}>Home</button>
        <button className={navClass(view, "about")} onClick={goAbout}>About Us</button>
        <button className={navClass(view, "contact")} onClick={goContact}>Contact Us</button>
        {!published && view.type === "home" && <PlusMenu showCategory {...mainMenuProps} />}
      </nav>
    </header>
  );
}

/* ---------------------------------- app ---------------------------------- */

export default function App() {
  const [siteName, setSiteName] = useState("Evermore Weddings");
  const [tagline, setTagline] = useState("");
  const [view, setView] = useState({ type: "home" });
  const [aboutColumns, setAboutColumns] = useState([{ id: uid(), photo: null, text: "" }]);
  const [contactInfo, setContactInfo] = useState({ phone: "", email: "" });
  const [mainBlocks, setMainBlocks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [footerContact, setFooterContact] = useState({ phone: "", email: "" });
  const [published, setPublished] = useState(false);
  const [siteLink, setSiteLink] = useState("");
  const [copyState, setCopyState] = useState("idle");

  const goHome = () => setView({ type: "home" });
  const goAbout = () => setView({ type: "about" });
  const goContact = () => setView({ type: "contact" });
  const goToCategory = (path) => setView({ type: "category", path });
  const goToHall = (path, listId, hallId) => setView({ type: "hall", path, listId, hallId });

  const addMainBlock = (type) => setMainBlocks((b) => [...b, { id: uid(), type, content: type === "text" ? "" : null }]);
  const updateMainBlock = (id, updated) => setMainBlocks((b) => b.map((x) => (x.id === id ? updated : x)));
  const removeMainBlock = (id) => setMainBlocks((b) => b.filter((x) => x.id !== id));
  const addRootCategory = (name) => setCategories((c) => [...c, newCategory(name)]);

  function handleGenerate() {
    // Use the real address this site is actually running at, when deployed.
    // Falls back to a friendly placeholder only when previewed locally with no real host.
    const origin = typeof window !== "undefined" && window.location && window.location.origin ? window.location.origin : "";
    const isRealHost = origin && !origin.startsWith("about:") && !origin.includes("null");
    setSiteLink(isRealHost ? origin : "your-site-address-will-appear-here-once-deployed");
    setPublished(true);
    setView({ type: "home" });
  }

  function copyLink() {
    try {
      navigator.clipboard.writeText(siteLink);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1500);
    } catch (e) {
      /* clipboard may be unavailable; ignore */
    }
  }

  const mainMenuProps = {
    onAddText: () => addMainBlock("text"),
    onAddPic: () => addMainBlock("image"),
    onAddVideo: () => addMainBlock("video"),
    onAddCategory: addRootCategory,
  };

  return (
    <div className="app-root">
      <GlobalStyles />

      {published && (
        <div className="publish-banner">
          <Share2 size={16} />
          <span>Your website is live — share this link: <strong>{siteLink}</strong></span>
          <button className="btn-small" onClick={copyLink}>{copyState === "copied" ? "Copied" : "Copy link"}</button>
          <button className="btn-small btn-ghost" onClick={() => setPublished(false)}><Edit3 size={14} /> Edit site</button>
        </div>
      )}

      <Header
        siteName={siteName}
        setSiteName={setSiteName}
        tagline={tagline}
        setTagline={setTagline}
        view={view}
        goHome={goHome}
        goAbout={goAbout}
        goContact={goContact}
        published={published}
        mainMenuProps={mainMenuProps}
      />

      <main className="site-main">
        {view.type === "home" && (
          <HomePage
            mainBlocks={mainBlocks}
            updateMainBlock={updateMainBlock}
            removeMainBlock={removeMainBlock}
            categories={categories}
            goToCategory={goToCategory}
            footerContact={footerContact}
            setFooterContact={setFooterContact}
            published={published}
          />
        )}
        {view.type === "about" && <AboutPage columns={aboutColumns} setColumns={setAboutColumns} published={published} />}
        {view.type === "contact" && <ContactPage contactInfo={contactInfo} setContactInfo={setContactInfo} published={published} />}
        {view.type === "category" && (
          <CategoryPage
            path={view.path}
            categories={categories}
            setCategories={setCategories}
            goHome={goHome}
            goToCategory={goToCategory}
            goToHall={goToHall}
            published={published}
          />
        )}
        {view.type === "hall" && (
          <HallDetailPage path={view.path} listId={view.listId} hallId={view.hallId} categories={categories} goBack={() => goToCategory(view.path)} />
        )}
      </main>

      {!published && (
        <button className="generate-btn" onClick={handleGenerate}>
          <LinkIcon size={16} /> Generate website
        </button>
      )}
    </div>
  );
}

/* ---------------------------------- styles ---------------------------------- */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap');

      .app-root {
        --ivory: #FBF7F1;
        --surface: #FFFFFF;
        --wine: #7A2035;
        --wine-dark: #5C1727;
        --gold: #B8935A;
        --gold-light: #E8D9BE;
        --charcoal: #2B2420;
        --muted: #8B7F74;
        --border: #E7DECF;

        font-family: 'Jost', sans-serif;
        background: var(--ivory);
        color: var(--charcoal);
        min-height: 100vh;
        padding-bottom: 90px;
        position: relative;
      }
      .app-root *, .app-root *:before, .app-root *:after { box-sizing: border-box; }
      .app-root button { font-family: inherit; cursor: pointer; }
      .app-root input, .app-root textarea {
        font-family: inherit;
        background: transparent;
        border: none;
        outline: none;
        color: var(--charcoal);
      }
      .app-root button:focus-visible, .app-root input:focus-visible, .app-root textarea:focus-visible, .app-root a:focus-visible {
        outline: 2px solid var(--wine);
        outline-offset: 2px;
      }
      @media (prefers-reduced-motion: reduce) {
        .app-root * { transition: none !important; animation: none !important; }
      }

      /* publish banner */
      .publish-banner {
        background: var(--wine-dark);
        color: var(--gold-light);
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        font-size: 13px;
        flex-wrap: wrap;
      }
      .publish-banner strong { color: #fff; }
      .btn-small {
        background: var(--gold);
        color: var(--wine-dark);
        border: none;
        border-radius: 20px;
        padding: 5px 14px;
        font-size: 12px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .btn-small.btn-ghost {
        background: transparent;
        border: 1px solid var(--gold-light);
        color: var(--gold-light);
      }
      .btn-small.btn-wine { background: var(--wine); color: #fff; }

      /* header */
      .site-header {
        text-align: center;
        padding: 40px 24px 18px;
        border-bottom: 1px solid var(--border);
        background: var(--surface);
      }
      .brand-row { display: flex; justify-content: center; }
      .site-name, .site-name-input {
        font-family: 'Cormorant Garamond', serif;
        font-size: 44px;
        font-weight: 600;
        letter-spacing: 0.5px;
        color: var(--wine-dark);
        text-align: center;
        margin: 0;
      }
      .site-name-input { width: min(600px, 90%); border-bottom: 1px dashed var(--gold); padding-bottom: 4px; }
      .site-name-input::placeholder { color: var(--muted); }

      .tagline-row { min-height: 22px; margin-top: 6px; display: flex; justify-content: center; }
      .site-tagline {
        font-size: 14.5px;
        letter-spacing: 0.5px;
        color: var(--muted);
        font-style: italic;
        margin: 0;
      }
      .site-tagline-input {
        font-size: 14px;
        font-style: italic;
        color: var(--muted);
        text-align: center;
        width: min(420px, 85%);
        border-bottom: 1px dashed var(--border);
        padding-bottom: 3px;
      }
      .site-tagline-input::placeholder { color: #C7BBAC; }

      .ornament {
        width: 140px;
        height: 14px;
        margin: 14px auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ornament::before, .ornament::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 55px;
        height: 1px;
        background: var(--gold);
        transform: translateY(-50%);
      }
      .ornament::before { left: 0; }
      .ornament::after { right: 0; }
      .ornament > .diamond {
        width: 7px; height: 7px; background: var(--gold); transform: rotate(45deg);
      }
      .ornament.small { width: 90px; margin: 0 auto 18px; }

      .main-nav {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        margin-top: 6px;
        position: relative;
        flex-wrap: wrap;
      }
      .nav-btn {
        background: transparent;
        border: none;
        color: var(--charcoal);
        font-size: 13px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        padding: 8px 16px;
        border-bottom: 2px solid transparent;
      }
      .nav-btn:hover { color: var(--wine); }
      .nav-btn.active { color: var(--wine); border-bottom-color: var(--gold); }

      /* plus menu */
      .plus-menu-wrap { position: relative; }
      .plus-btn {
        width: 30px; height: 30px;
        border-radius: 50%;
        border: 1px solid var(--gold);
        background: var(--surface);
        color: var(--wine);
        display: inline-flex; align-items: center; justify-content: center;
        margin-left: 4px;
      }
      .plus-btn:hover { background: var(--gold); color: #fff; }
      .plus-btn.standalone { display: flex; margin: 20px auto 0; }
      .plus-dropdown {
        position: absolute;
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 6px;
        box-shadow: 0 10px 30px rgba(90,40,20,0.12);
        padding: 6px;
        display: flex;
        flex-direction: column;
        min-width: 190px;
        z-index: 40;
      }
      .plus-dropdown button {
        display: flex;
        align-items: center;
        gap: 8px;
        background: transparent;
        border: none;
        text-align: left;
        padding: 9px 10px;
        border-radius: 6px;
        font-size: 13.5px;
        color: var(--charcoal);
      }
      .plus-dropdown button:hover { background: var(--ivory); color: var(--wine); }
      .inline-form { display: flex; flex-direction: column; gap: 6px; padding: 4px; }
      .inline-form input {
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 7px 9px;
        font-size: 13px;
      }
      .inline-form-actions { display: flex; gap: 6px; justify-content: flex-end; }
      .inline-form-actions button {
        border: 1px solid var(--border);
        background: var(--surface);
        border-radius: 6px;
        padding: 5px 8px;
        display: flex; align-items: center;
      }
      .inline-form-actions button:first-child { background: var(--wine); color: #fff; border-color: var(--wine); }

      /* main + pages */
      .site-main { max-width: 880px; margin: 0 auto; padding: 34px 24px 40px; }
      .page h1 {
        font-family: 'Cormorant Garamond', serif;
        font-size: 34px;
        color: var(--wine-dark);
        text-align: center;
        margin: 0 0 6px;
      }

      .empty-hint {
        text-align: center;
        color: var(--muted);
        font-size: 14px;
        border: 1px dashed var(--border);
        border-radius: 6px;
        padding: 22px;
        margin-bottom: 20px;
      }

      .blocks-area { display: flex; flex-direction: column; gap: 18px; margin-bottom: 10px; }
      .block { position: relative; background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 16px; }
      .block-text textarea {
        width: 100%; min-height: 90px; resize: vertical; font-size: 15px; line-height: 1.6; color: var(--charcoal);
      }
      .block-text p { font-size: 15.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; }
      .block-image img, .block-video video { width: 100%; border-radius: 8px; display: block; max-height: 420px; object-fit: cover; }
      .remove-btn {
        position: absolute; top: 8px; right: 8px;
        width: 22px; height: 22px; border-radius: 50%;
        background: rgba(43,36,32,0.65); color: #fff; border: none;
        display: flex; align-items: center; justify-content: center;
      }

      .file-choose {
        border: 1.5px dashed var(--gold);
        border-radius: 6px;
        padding: 30px 14px;
        display: flex; flex-direction: column; align-items: center; gap: 8px;
        color: var(--wine);
        font-size: 13px;
        background: var(--ivory);
      }
      .file-choose:hover { background: var(--gold-light); }

      .section-label {
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 12px;
        color: var(--gold);
        text-align: center;
        margin: 30px 0 14px;
      }

      .category-grid, .subcategory-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 14px;
      }
      .category-tile {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 26px 14px;
        text-align: center;
        font-family: 'Cormorant Garamond', serif;
        font-size: 19px;
        color: var(--wine-dark);
        transition: border-color .15s, transform .15s;
      }
      .category-tile:hover { border-color: var(--gold); transform: translateY(-2px); }
      .category-tile.large { padding: 34px 14px; font-size: 21px; }

      .footer-contact {
        margin-top: 46px;
        border-top: 1px solid var(--border);
        padding-top: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
      .footer-row { display: flex; align-items: center; gap: 8px; color: var(--muted); font-size: 14px; }
      .footer-row input { border-bottom: 1px dashed var(--border); padding: 3px 4px; min-width: 220px; text-align: center; }
      .footer-row a { color: var(--wine); text-decoration: none; }
      .footer-row a:hover { text-decoration: underline; }

      /* about */
      .about-columns { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 22px; margin-top: 26px; }
      .about-column { position: relative; background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 16px; }
      .about-photo { margin-bottom: 12px; }
      .about-photo img { width: 100%; border-radius: 8px; display: block; height: 200px; object-fit: cover; }
      .about-textarea { width: 100%; min-height: 100px; font-size: 14.5px; line-height: 1.6; }
      .about-text { font-size: 14.5px; line-height: 1.7; margin: 0; white-space: pre-wrap; }

      /* contact */
      .contact-form { max-width: 380px; margin: 28px auto 0; display: flex; flex-direction: column; gap: 6px; }
      .contact-form label { display: flex; align-items: center; gap: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--gold); margin-top: 14px; }
      .contact-form input, .contact-form a { border-bottom: 1px solid var(--border); padding: 8px 2px; font-size: 16px; display: block; text-decoration: none; color: var(--charcoal); }
      .contact-form a { color: var(--wine); }

      /* category page */
      .breadcrumb { display: flex; align-items: center; flex-wrap: wrap; gap: 4px; font-size: 12.5px; color: var(--muted); margin-bottom: 18px; }
      .breadcrumb button { background: none; border: none; color: var(--muted); }
      .breadcrumb button:hover { color: var(--wine); text-decoration: underline; }
      .crumb-sep { margin: 0 4px; }
      .category-header { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 4px; }
      .category-header h1 { margin: 0; }
      .category-name-input {
        font-family: 'Cormorant Garamond', serif;
        font-size: 32px;
        color: var(--wine-dark);
        text-align: center;
        border-bottom: 1px dashed var(--gold);
        min-width: 160px;
      }

      /* venue list */
      .venue-list { margin-top: 34px; }
      .venue-list-head { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 12px; }
      .list-title-input {
        font-family: 'Cormorant Garamond', serif;
        font-size: 22px;
        color: var(--wine-dark);
        text-align: center;
        border-bottom: 1px dashed var(--gold);
      }
      .venue-list h3 { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: var(--wine-dark); margin: 0; text-align: center; }
      .icon-btn-ghost { background: none; border: none; color: var(--muted); }
      .icon-btn-ghost:hover { color: var(--wine); }

      .search-bar {
        display: flex; align-items: center; gap: 8px;
        background: var(--surface); border: 1px solid var(--border); border-radius: 24px;
        padding: 9px 16px; max-width: 380px; margin: 0 auto 18px; color: var(--muted);
      }
      .search-bar input { flex: 1; font-size: 14px; }

      .venue-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        gap: 14px;
      }
      .venue-card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 6px;
        overflow: hidden;
        text-align: left;
        display: flex;
        flex-direction: column;
        padding: 0;
      }
      .venue-card:hover { border-color: var(--gold); }
      .venue-thumb { height: 110px; background: var(--ivory); display: flex; align-items: center; justify-content: center; overflow: hidden; }
      .venue-thumb img { width: 100%; height: 100%; object-fit: cover; }
      .thumb-placeholder { color: var(--gold); }
      .venue-info { padding: 10px 12px 12px; display: flex; flex-direction: column; gap: 3px; }
      .venue-name { font-weight: 500; font-size: 14px; color: var(--charcoal); }
      .venue-price { font-size: 12.5px; color: var(--wine); }

      .venue-card.add-card {
        align-items: center; justify-content: center; gap: 6px;
        color: var(--gold); border-style: dashed; min-height: 160px; font-size: 13px;
      }
      .venue-card.add-form { padding: 12px; gap: 8px; display: flex; flex-direction: column; }
      .venue-card.add-form input, .venue-card.add-form textarea {
        border: 1px solid var(--border); border-radius: 6px; padding: 7px 9px; font-size: 13px;
      }
      .venue-card.add-form textarea { min-height: 60px; }
      .empty-note { color: var(--muted); font-size: 13px; grid-column: 1/-1; text-align: center; padding: 18px; }

      /* hall detail */
      .hall-detail-page { text-align: center; }
      .back-link {
        background: none; border: none; color: var(--muted);
        display: inline-flex; align-items: center; gap: 4px; font-size: 13px; margin-bottom: 18px;
      }
      .back-link:hover { color: var(--wine); }
      .price-tag {
        display: inline-flex; align-items: center; gap: 4px;
        background: var(--gold-light); color: var(--wine-dark);
        border-radius: 20px; padding: 4px 14px; font-size: 13px; margin: 8px 0 20px;
      }
      .carousel { position: relative; display: flex; align-items: center; justify-content: center; }
      .carousel img, .carousel video { width: 100%; max-height: 440px; object-fit: cover; border-radius: 6px; }
      .no-media { width: 100%; padding: 60px 20px; background: var(--surface); border: 1px dashed var(--border); border-radius: 6px; color: var(--muted); }
      .carousel-nav {
        position: absolute; top: 50%; transform: translateY(-50%);
        background: rgba(43,36,32,0.55); color: #fff; border: none;
        width: 34px; height: 34px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
      }
      .carousel-nav.prev { left: 10px; }
      .carousel-nav.next { right: 10px; }
      .carousel-dots { display: flex; justify-content: center; gap: 6px; margin: 14px 0; }
      .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--border); cursor: pointer; }
      .dot.active { background: var(--wine); }
      .hall-details { text-align: left; max-width: 560px; margin: 20px auto 0; }
      .hall-details h3 { font-family: 'Cormorant Garamond', serif; color: var(--wine-dark); font-size: 20px; }
      .hall-details p { line-height: 1.7; color: var(--charcoal); white-space: pre-wrap; }

      /* generate button */
      .generate-btn {
        position: fixed;
        right: 24px;
        bottom: 24px;
        background: var(--wine);
        color: #fff;
        border: none;
        border-radius: 30px;
        padding: 14px 22px;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 10px 24px rgba(90,20,30,0.28);
        z-index: 50;
      }
      .generate-btn:hover { background: var(--wine-dark); }

      @media (max-width: 560px) {
        .site-name, .site-name-input { font-size: 32px; }
        .site-main { padding: 24px 16px 40px; }
        .generate-btn { right: 16px; bottom: 16px; padding: 12px 18px; font-size: 13px; }
      }
    `}</style>
  );
}
