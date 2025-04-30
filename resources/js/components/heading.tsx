export default function Heading({ title, description }: { title: string; description?: string }) {
    return (
        <div className="space-y-0.5">
            <h2 className="lg:text-3xl text-xl md:text-2xl font-bold tracking-tight uppercase">{title}</h2>
            {description && <p className="md:text-sm text-xs text-muted-foreground text-center md:text-start">{description}</p>}
        </div>
    );
}
