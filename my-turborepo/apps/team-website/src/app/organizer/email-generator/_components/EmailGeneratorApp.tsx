"use client";

import React, { useState } from "react";
import { CodeEditor } from "~/app/organizer/email-generator/_components/CodeEditor";
import { EmailPreview } from "~/app/organizer/email-generator/_components/EmailPreview";
import { ResizablePanels } from "~/app/organizer/email-generator/_components/ResizablePanels";
import { Button } from "~/app/organizer/email-generator/_components/ui/button";
import { Code, Eye, HelpCircle } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/organizer/email-generator/_components/ui/tabs";
import { ThemeToggle } from "~/app/organizer/email-generator/_components/ThemeToggle";
import { ApiConfigurationModal } from "~/app/organizer/email-generator/_components/ApiConfigurationModal";
import {
  getApiDataForTemplate,
  useApi,
} from "~/app/organizer/email-generator/_contexts/ApiContext";
import { Documentation } from "~/app/organizer/email-generator/_components/Documentation";

export default function EmailGeneratorApp() {
  const [activeTab, setActiveTab] = useState("editor");
  const [code, setCode] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [error, setError] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [detectedFunction, setDetectedFunction] = useState<string>("");

  const { fetchAllApis, apiData, isLoading: isApiLoading } = useApi();

  const generateHtml = async () => {
    if (!code.trim()) {
      setError("Please enter some code to generate the email");
      return;
    }

    setIsGenerating(true);
    setError("");
    setDetectedFunction("");

    try {
      await fetchAllApis();

      const apiDataForTemplate = getApiDataForTemplate(apiData);

      const {
        Html,
        Head,
        Body,
        Container,
        Text,
        Button,
        Section,
        Heading,
        Img,
        Tailwind,
      } = await import("@react-email/components");

      const { CustomButton, Card, Header: EmailTemplateHeader, Footer } =
        await import("~/app/organizer/email-generator/_components/email");
      const { logoUrl, heroBgUrl, footerBear } = await import("public/assets");

      const { transform } = await import("@babel/standalone");

      let transformedCode: string;
      try {
        const result = transform(code, {
          presets: [["react", { runtime: "classic" }]],
          plugins: [],
        });
        transformedCode = typeof result?.code === "string" ? result.code : code;
      } catch {
        transformedCode = code;
      }

      if (!transformedCode) {
        throw new Error(
          "Could not transform your template (empty output). Check for syntax errors.",
        );
      }

      const executeTemplate = new Function(
        "React",
        "Html",
        "Head",
        "Body",
        "Container",
        "Text",
        "Button",
        "Section",
        "Heading",
        "Img",
        "Tailwind",
        "CustomButton",
        "Card",
        "Header",
        "Footer",
        "logoUrl",
        "heroBgUrl",
        "footerBear",
        "API",
        "__emailTemplateSource",
        `
        ${transformedCode}

        const functionRegex = /(?:const|let|var|function)\\s+([A-Z][a-zA-Z0-9_]*)/g;
        const matches = [...__emailTemplateSource.matchAll(functionRegex)];

        if (matches.length === 0) {
          throw new Error("No React component function found. Please define a function starting with a capital letter.");
        }

        const functionName = matches[0][1];
        window.detectedFunctionName = functionName;
        const component = eval(functionName);

        if (typeof component !== 'function') {
          throw new Error(\`Found "\${functionName}" but it's not a function.\`);
        }

        return component({});
        `,
      );

      const emailElement = executeTemplate(
        React,
        Html,
        Head,
        Body,
        Container,
        Text,
        Button,
        Section,
        Heading,
        Img,
        Tailwind,
        CustomButton,
        Card,
        EmailTemplateHeader,
        Footer,
        logoUrl,
        heroBgUrl,
        footerBear,
        apiDataForTemplate,
        transformedCode,
      );

      const detectedFunctionName =
        (window as unknown as { detectedFunctionName?: string })
          .detectedFunctionName ?? "Unknown";
      setDetectedFunction(detectedFunctionName);

      const { render } = await import("@react-email/render");
      const htmlResult = await render(emailElement);
      setHtmlContent(htmlResult);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate email";
      setError(errorMessage);
      setHtmlContent("");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="email-generator-root h-[83.333svh] max-h-[83.333svh] overflow-hidden bg-background flex flex-col">
      <main className="h-full min-h-0">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-full flex flex-col"
        >
          <div className="flex items-center justify-between">
            <TabsList className="justify-center space-x-1 w-fit bg-card border border-border rounded-xl p-1 shadow-sm mb-4 mx-4 mt-4">
              <TabsTrigger
                value="editor"
                className="data-[state=active]:bg-brand-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-brand transition-smooth"
              >
                <Code className="w-4 h-4 mr-2" />
                Editor
              </TabsTrigger>
              <TabsTrigger
                value="documentation"
                className="data-[state=active]:bg-brand-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-brand transition-smooth"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Documentation
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4 pr-4">
              {detectedFunction && (
                <div className="px-3 py-2 bg-brand-light/30 rounded-lg border border-brand-accent/20">
                  <div className="text-sm text-brand-primary font-medium">
                    <span className="text-muted-foreground">Function:</span>{" "}
                    <code className="px-2 py-1 bg-brand-primary/10 rounded text-brand-primary">
                      {detectedFunction}
                    </code>
                  </div>
                </div>
              )}
              <ApiConfigurationModal />
              <ThemeToggle />
              <Button
                onClick={generateHtml}
                disabled={isGenerating || isApiLoading}
                className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-primary-foreground shadow-brand transition-smooth hover-lift"
              >
                <Eye className="h-4 w-4" />
                {isGenerating
                  ? "Generating..."
                  : isApiLoading
                    ? "Fetching APIs..."
                    : "Generate Preview"}
              </Button>
            </div>
          </div>

          <TabsContent value="editor" className="flex-0 min-h-11 mt-0 px-4 pb-4">
            <ResizablePanels
              leftPanel={
                <CodeEditor value={code} onChange={setCode} height="100%" />
              }
              rightPanel={
                <EmailPreview
                  htmlContent={htmlContent}
                  error={error}
                  isLoading={isGenerating}
                />
              }
              leftTitle="Code Editor"
              rightTitle="Email Preview"
              initialSplitRatio={0.5}
              minPanelWidth={250}
            />
          </TabsContent>

          <TabsContent
            value="documentation"
            className="mt-0 flex min-h-0 flex-1 flex-col px-0 pb-0"
          >
            <div className="min-h-0 flex-1">
              <Documentation />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
