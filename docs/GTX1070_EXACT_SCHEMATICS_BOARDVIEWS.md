# GTX 1070 exact-model schematic and boardview sources — 18 November 2026

**Physical inventory:** 66 Colorful iGame GTX 1070 U-TOP 8GB (**2 × 6-pin**) and 23 Gigabyte GV-N1070WF2OC-8GD Rev. 2.0 (**1 × 8-pin**).

**Evidence state:** Verified **archive listings**, not downloaded/inspected CAD files. Physical PCB revisions must be checked before using any file for repairs. A *schematic* shows actual circuit nets and components; a *boardview* is a PCB component/layout map, not necessarily an electrical schematic. Archives often put both under titles containing "schematic".

## Colorful: exact U-TOP schematic listing

**Filename/board identifier:** **Colorful iGame GTX1070 U-TOP D5 8GB GP104H8-D50 Rev A Schematic** (Russian title "Схема").

- [ServiceComp resource listing](https://xn----8sbafotoqlagnhme.xn--p1ai/forums/resources/colorful-igame-gtx1070-u-top-d5-8gb-gp104h8-d50-rev-a-%D0%A1%D1%85%D0%B5%D0%BC%D0%B0.25063/) — posted **22 April 2022**; explicitly U-TOP and **GP104H8-D50 Rev A**. An indexed listing shows **50 RUB** and account/payment access, not a verified free download. The schematic bytes/pages have **not been examined**.
- [BiosHelp independent index](https://bioshelp.com/archive/index.php/forum-213.html) — separately lists the same exact-model/PCB schematic, but its attachment was not retrieved.
- [Colorful original Chinese U-TOP manufacturer page](https://www.colorful.cn/home/product?id=382&mid=102) — U-TOP **6+2 VRM phases**, three fans, **one 8mm + one 6mm heatpipe**, OC mode 1569/1759 MHz.
- [Korean Waycos launch information (2016)](https://www.bodnara.co.kr/bbs/article.html?num=132217) and [Japanese exact U-TOP SKU](https://kakaku.com/item/K0001039095/) independently confirm **6+6-pin power**.
- [Chinese teardown of closely named iGame 烈焰战神U variant](https://m.zol.com.cn/quanzi/d14_11211.html) reports **uP9511P PWM**, **6+2 phases**, dual 6-pin, Samsung K4G80325FB-HC25 GDDR5. **Do not assume identical PCB BOM or revision** without inspection.

**Critical verification:** Is **GP104H8-D50 Rev A** printed on the physical PCB? If not, this candidate may be unsuitable even though the marketing name matches.

## Gigabyte: exact model and Rev. 2.0 boardview listings

- [EletrônicaBR — GV-N1070WF2OC-8GD Rev. 2.0](https://eletronicabr.com/en/files/file/45152-boardview-gigabyte-video-card-gv-n1070wf2oc-8gd-rev-20-schematic/) — explicitly identifies **7.76 MB TVW boardview**, uploaded March 2024; forum download/access requirements may apply. Its **package content is a boardview**, despite "schematic" in page title.
- [RM Schematics — same Rev. 2.0 boardview](https://reniemarquet.com/files/gigabyte-gv-n1070wf2oc-8gd-rev-2-0-14560/) — archive describes **1.1MB RAR with TVW**, public [Telegram archive post #14560](https://t.me/schematicslaptop/14560). Actual archive contents **not downloaded or examined**.
- [LeviRepair Gigabyte GTX 1000 pack](https://www.levirepair.eu/infusions/forum/index.php?forum_id=3&view=activity&viewforum=) — lists **GV-N1070WF2OC-8GD Rev 2.0.tvw** in a community ZIP; not inspected.
- [DominikCell directory listing](https://dominikcell.com/modelos/graphics-card-2-gigabyte-schematic-and-boardview-video-of-all-in-one-machine-n1070wf2oc-8gd/) — claims a **GV-N1070WF2OC-8GD-2.0.pdf** *schematic*. **Unverified**: the PDF was not accessible/inspected, the page has generic mobile-device text unrelated to GPUs, so independently confirm legitimacy before installing tools or paying.
- [RealSchematic paid full PDF + boardview](https://realschematic.com/shop/11930/desc/gigabyte-geforce-gtx-1070-windforce-oc-8g) — genuine *listing* for **42-page Rev. 1.0 PDF**, **not Rev. 2.0**. May be useful to compare circuits; **not an exact-revision schematic**.

**Status:** Gigabyte exact Rev. 2.0 boardviews are clearly indexed, but **a full Rev. 2.0 circuit schematic has not been independently verified**.

## Correction to earlier Colorful specifications

The Colorful Europe distributor page [here](https://www.colorfly.eu/products/graphic-cards-for-industrial-use/basics-for-customized/igame-gtx1070-u-top-8g/) asserts **2×8-pin, four 7mm heatpipes and 1797 MHz**. These conflict with the owner's cards, the *original Chinese Colorful U-TOP* page, contemporaneous Korean launch records, Japanese exact SKU specifications and an independent teardown.

For the actual U-TOP variant under study use **2×6-pin, 6+2 phases, and 1×8mm+1×6mm heatpipes**. X-TOP listings commonly have 2×8-pin, 8+2 VRM phases and 1797 MHz; do not conflate those models.

## Before relying on drawings

1. Photograph the actual **PCB silkscreen and revision** on one Colorful and one Gigabyte board (keep serials private). Check Colorful GP104H8-D50 Rev A, Gigabyte Rev 2.0.
2. Obtain files only via the archive's legitimate download process. No paid access, accounts, device firmware or physical modifications have been authorised or performed.
3. Inspect file content, PCB outline, connector arrangement, chip positions and net names before calling it a match. A model string in a file title is insufficient evidence.
4. Use boardview files as *data*, not bundled unsigned executables. Do not flash third-party VBIOS or force different 6-pin/8-pin electrical connectors.

**Research outcome:** SOURCE LISTINGS FOUND for both models; DIRECT FILE BYTES NOT VERIFIED; EXACT PHYSICAL PCB MATCH NOT VERIFIED.
