"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tabs = [
  { label: "Cards", value: "cards" },
  { label: "Block", value: "block" },
  { label: "Form", value: "form" },
  { label: "List", value: "list" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-0 md:p-12 font-sans">
      <Tabs defaultValue="cards" className="w-full max-w-7xl  mx-auto">
        <TabsList className="bg-transparent mb-6">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab 1: Cards Grid */}
        <TabsContent value="cards">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="font-semibold">Card {i + 1}</CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 2: Big Block */}
        <TabsContent value="block">
          <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center text-lg font-medium text-muted-foreground">
            This is a large block element to showcase full-width content.
          </div>
        </TabsContent>

        {/* Tab 3: Simple Form */}
        <TabsContent value="form">
          <div className="grid gap-4 max-w-md">
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button className="w-fit">Submit</Button>
          </div>
        </TabsContent>

        {/* Tab 4: List */}
        <TabsContent value="list">
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Install dependencies</li>
            <li>Start the dev server</li>
            <li>Customize components</li>
            <li>Deploy to Vercel</li>
          </ul>
        </TabsContent>
      </Tabs>
    </main>
  );
}
