import React from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Unlock, GripVertical, EyeOff } from "lucide-react";

interface SectionRow {
  id: string;
  section_key: string;
  section_label: string;
  required_tier: "explorer" | "pro" | "premium";
  is_locked: boolean;
  admin_only: boolean;
  is_hidden: boolean;
  sort_order: number;
}

interface Props {
  sections: SectionRow[];
  saving: string | null;
  onReorder: (reordered: SectionRow[]) => void;
  onTierChange: (id: string, tier: "explorer" | "pro" | "premium") => void;
  onAdminOnlyChange: (id: string, val: boolean) => void;
  onLockChange: (id: string, val: boolean) => void;
  onHideChange: (id: string, val: boolean) => void;
  tierColor: (tier: string) => string;
}

function SortableRow({
  section, saving, onTierChange, onAdminOnlyChange, onLockChange, onHideChange, tierColor,
}: {
  section: SectionRow;
  saving: string | null;
  onTierChange: Props["onTierChange"];
  onAdminOnlyChange: Props["onAdminOnlyChange"];
  onLockChange: Props["onLockChange"];
  onHideChange: Props["onHideChange"];
  tierColor: Props["tierColor"];
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4 align-middle w-10">
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none">
          <GripVertical className="w-4 h-4" />
        </button>
      </td>
      <td className="p-4 align-middle font-medium">{section.section_label}</td>
      <td className="p-4 align-middle">
        <Select value={section.required_tier} onValueChange={(val) => onTierChange(section.id, val as any)} disabled={saving === section.id}>
          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="explorer">Explorer</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td className="p-4 align-middle"><Switch checked={section.admin_only} onCheckedChange={(c) => onAdminOnlyChange(section.id, c)} disabled={saving === section.id} /></td>
      <td className="p-4 align-middle"><Switch checked={section.is_locked} onCheckedChange={(c) => onLockChange(section.id, c)} disabled={saving === section.id} /></td>
      <td className="p-4 align-middle"><Switch checked={!!section.is_hidden} onCheckedChange={(c) => onHideChange(section.id, c)} disabled={saving === section.id} /></td>
      <td className="p-4 align-middle">
        {section.is_hidden ? <Badge variant="destructive" className="gap-1"><EyeOff className="w-3 h-3" /> Hidden</Badge>
          : section.admin_only ? <Badge variant="destructive" className="gap-1"><Shield className="w-3 h-3" /> Admin Only</Badge>
          : section.is_locked ? <Badge variant="destructive" className="gap-1"><Lock className="w-3 h-3" /> Locked</Badge>
          : <Badge variant={tierColor(section.required_tier) as any} className="gap-1"><Unlock className="w-3 h-3" /> {section.required_tier}</Badge>}
      </td>
    </tr>
  );
}

export default function SortableSectionsTable({ sections, saving, onReorder, onTierChange, onAdminOnlyChange, onLockChange, onHideChange, tierColor }: Props) {
  const sorted = [...sections].sort((a, b) => a.sort_order - b.sort_order);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sorted.findIndex((s) => s.id === active.id);
    const newIndex = sorted.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(sorted, oldIndex, newIndex).map((s, i) => ({ ...s, sort_order: i + 1 }));
    onReorder(reordered);
  };

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-10"></th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Section</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Required Tier</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Admin Only</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Locked</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Hide</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
          </tr>
        </thead>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sorted.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <tbody className="[&_tr:last-child]:border-0">
              {sorted.map((section) => (
                <SortableRow
                  key={section.id}
                  section={section}
                  saving={saving}
                  onTierChange={onTierChange}
                  onAdminOnlyChange={onAdminOnlyChange}
                  onLockChange={onLockChange}
                  onHideChange={onHideChange}
                  tierColor={tierColor}
                />
              ))}
            </tbody>
          </SortableContext>
        </DndContext>
      </table>
    </div>
  );
}
