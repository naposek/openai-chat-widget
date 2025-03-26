
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";
import { ChatSettings as ChatSettingsType, loadChatSettings, saveChatSettings } from "@/services/openai";

interface ChatSettingsProps {
  onSettingsChange: (settings: ChatSettingsType) => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({ onSettingsChange }) => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettingsType>(loadChatSettings());

  // Fixed the infinite loop by adding proper dependency array
  useEffect(() => {
    // Load settings on component mount only, not on every render
    const savedSettings = loadChatSettings();
    setSettings(savedSettings);
    // Call this only once on mount
  }, []);
  
  // Separate effect to handle settings changes
  useEffect(() => {
    // Notify parent of settings changes, but don't re-save on mount
    onSettingsChange(settings);
  }, [settings, onSettingsChange]);

  const handleSave = () => {
    saveChatSettings(settings);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>DecoChat DekorAI Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="apiKey">OpenAI API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={settings.apiKey}
              onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
            />
            <p className="text-sm text-muted-foreground">
              Your API key is stored only in your browser's localStorage.
            </p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="assistantId">Assistant ID (optional)</Label>
            <Input
              id="assistantId"
              placeholder="asst_..."
              value={settings.assistantId || ""}
              onChange={(e) => setSettings({ ...settings, assistantId: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="model">Model</Label>
            <Select 
              value={settings.model || "gpt-4o-mini"} 
              onValueChange={(value) => setSettings({ ...settings, model: value })}
            >
              <SelectTrigger id="model">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o-mini">GPT-4o Mini (Faster & Cheaper)</SelectItem>
                <SelectItem value="gpt-4o">GPT-4o (More Powerful)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleSave}>Save Settings</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ChatSettings;
